import { RequestContext } from '@common/decorators/request-context.decorator';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Body, Controller, Delete, Get, Logger, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RegisterCredentialsDto } from '../dtos/register-credentials.dto';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { AuthenticationResponseDto } from '../dtos/authentication-response.dto';
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private authService: AuthService, private configService: ConfigService) {}

  @Serialize(AuthenticationResponseDto)
  @Post('/register')
  async register(
    @RequestContext() ctx: RequestContextDto,
    @Body() registerCredentialsDto: RegisterCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<BaseApiSuccessResponse<AuthenticationResponseDto>> {
    this.logger.verbose(`New User Registring`);

    const authPayload = await this.authService.register(ctx, registerCredentialsDto);
    this.buildCookieTokenResponse(ctx, res, authPayload.token);

    return {
      success: true,
      statusCode: 201,
      message: `Registration successfull`,
      data: authPayload,
    };
  }

  private buildCookieTokenResponse(ctx: RequestContextDto, response: Response, token: string) {
    this.logger.verbose(`Cookie Token Response`);
    const cookieOptions = {
      expires: new Date(Date.now() + +this.configService.get('JWT_ACCESS_TOKEN_EXPIRES') * 1000),
    };
    response.status(200).cookie('token', token, cookieOptions);
  }
}
