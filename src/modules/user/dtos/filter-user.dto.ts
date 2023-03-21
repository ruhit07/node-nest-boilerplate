import { IsEnum, IsString } from 'class-validator';
import { UserRole, UserStatus } from '../enums';

export class FilterUserDto {
  @IsString()
  username?: string;

  @IsEnum(UserRole)
  role?: UserRole;

  @IsEnum(UserStatus)
  status?: UserStatus;
}
