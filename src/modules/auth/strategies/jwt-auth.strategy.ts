import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AccessTokenPayload } from '../dtos/access-token-payload.dto';
import { UserService } from '@modules/user/services/user.service';
import { UserDto } from '@modules/user/dtos';
import { UserStatus } from '@modules/user/enums';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(public readonly userService: UserService, public readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), JwtAuthStrategy.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: AccessTokenPayload): Promise<UserDto> {
    const { sub: id } = payload;
    const user = await this.userService.findUser(id);

    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.status == UserStatus.Inactive) {
      throw new UnauthorizedException();
    }
    return user;
  }

  // extract jwt from cookie
  private static extractJWT(req: Request): string | null {
    return req.cookies.token;
  }
}
