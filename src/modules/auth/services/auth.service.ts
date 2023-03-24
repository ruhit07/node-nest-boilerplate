import { RequestContextDto } from '@common/dtos/request-context.dto';
import { CreateUserDto, UserDto } from '@modules/user/dtos';
import { UserService } from '@modules/user/services/user.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { RegisterCredentialsDto, LoginCredentialsDto, AuthenticationResponseDto } from '../dtos';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async register(
    ctx: RequestContextDto,
    authCredentialsDto: RegisterCredentialsDto,
  ): Promise<AuthenticationResponseDto> {
    this.logger.log(`${this.register.name}Service Called`);

    const user = await this.userService.createUser(ctx, authCredentialsDto as CreateUserDto);

    const token = await this.generateAccessToken(ctx, user);

    return {
      user,
      token,
    };
  }

  async login(ctx: RequestContextDto, loginCredentialsDto: LoginCredentialsDto): Promise<AuthenticationResponseDto> {
    this.logger.log(`${this.login.name} Service called.`);

    const { username, password } = loginCredentialsDto;

    const user = await this.userService.findUserByUsername(username);

    const valid = user ? await this.userService.validateUser(user, password) : false;
    if (!valid) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    const token = await this.generateAccessToken(ctx, user);

    return {
      user,
      token,
    };
  }

  private generateAccessToken(ctx: RequestContextDto, user: UserDto): Promise<string> {
    this.logger.log(`${this.generateAccessToken.name}Service Called`);

    const opts: JwtSignOptions = { subject: user.id };

    return this.jwtService.signAsync({}, opts);
  }
}
