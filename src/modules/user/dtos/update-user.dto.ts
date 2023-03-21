import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { UserRole, UserStatus } from '../enums';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  username: string;

  @IsEnum(UserRole)
  @IsOptional()
  roles: UserRole;

  @IsString()
  @IsNotEmpty()
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

  @IsEnum(UserStatus)
  status: UserStatus;
}
