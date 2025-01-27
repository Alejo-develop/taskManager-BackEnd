import { IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;
}
