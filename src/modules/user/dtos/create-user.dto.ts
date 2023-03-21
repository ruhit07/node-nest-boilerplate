import { Transform } from 'class-transformer';
import { IsDefined, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @IsDefined()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @IsDefined()
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  roles: UserRole;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsMobilePhone()
  @IsOptional()
  mobileNo: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  photo: string;
}
