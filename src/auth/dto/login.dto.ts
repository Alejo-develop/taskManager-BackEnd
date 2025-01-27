import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;
}
