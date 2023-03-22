import { UserDto } from '@modules/user/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class AuthenticationResponseDto {
  @Expose()
  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @ApiProperty()
  token: string;
}
