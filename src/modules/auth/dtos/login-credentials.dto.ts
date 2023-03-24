import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  password: string;
}
