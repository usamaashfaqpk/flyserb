import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDetailsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
