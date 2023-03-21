import { Expose } from 'class-transformer';
import { UserRole, UserStatus } from '../enums';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  mobileNo: string;

  @Expose()
  photo: string;

  @Expose()
  username: string;

  @Expose()
  role: UserRole;

  @Expose()
  status: UserStatus;
}
