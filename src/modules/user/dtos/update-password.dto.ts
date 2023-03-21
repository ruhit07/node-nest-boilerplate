import { IsString, IsNotEmpty, Length, IsDefined } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @Length(8, 20)
  newPassword: string;
}
