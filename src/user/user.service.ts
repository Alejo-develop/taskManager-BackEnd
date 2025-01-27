import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async finOneByEmail(email: string) {
    return await this.userRepository.findOne({where: {email: email}});
  }

  async create(authDto) {
    return await this.userRepository.save(authDto)
  }

  async findUserByEmailWithPassword(email: string){
    return await this.userRepository.findOne({
      where: {email: email},
      select: [
        'id',
        'email',
        'name', 
        'password'
      ]
    })
  }

  async findById(id: string): Promise<User> {
    const userFound = await this.userRepository.findOne({where: {id}})

    if(!userFound) throw new NotFoundException('User not found')

    return userFound
  }

  async updateUser(id: string, updateUserDto){
    const userFound = await this.findById(id)
    return await this.userRepository.save({...userFound, ...updateUserDto})
  }

  async removeUser(id: string){
    await this.findById(id)
    return await this.userRepository.softDelete(id)
  }
}
