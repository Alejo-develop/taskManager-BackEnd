import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/user/user.service";
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from "./dto/login.dto";
import { SignUpDto } from "./dto/signUp.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtServices: JwtService,
    private readonly userServices: UsersService,
  ) {}

  private async encryptPassword(password: string) {
    const hashPassword = await bcryptjs.hash(password, 10);
    return hashPassword;
  }

  private async comparePasswords(
    newPassword: string,
    password: string,
  ): Promise<boolean> {
    const isValidPassword = await bcryptjs.compare(newPassword, password);
    if (!isValidPassword) throw new UnauthorizedException('password is wrong');

    return isValidPassword;
  }

  private async verifyIfUserAlreadyExist(email: string) {
    const userFound = await this.userServices.finOneByEmail(email);

    if (userFound) throw new ConflictException('Email already exist');
  }

  private async createToken(email: string, name: string) {
    const payload = { email: email, name: name };
    const token = await this.jwtServices.signAsync(payload);

    return token;
  }

  async login(loginDto: LoginDto) {
    const userFound = await this.userServices.findUserByEmailWithPassword(
      loginDto.email,
    );

    if (!userFound) throw new NotFoundException('Email not found');

    await this.comparePasswords(loginDto.password, userFound.password);
    const token = await this.createToken(userFound.email, userFound.name);

    return {
      id: userFound.id,
      token,
    };
  }

  async signUp(signUpDto: SignUpDto) {
    await this.verifyIfUserAlreadyExist(signUpDto.email);
    const hashpassword = await this.encryptPassword(signUpDto.password);

    return await this.userServices.create({
      ...signUpDto,
      password: hashpassword,
    });
  }
}