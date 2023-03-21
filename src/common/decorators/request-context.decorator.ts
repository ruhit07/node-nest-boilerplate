import { UserDto } from '@modules/user/dtos/user.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { RequestContextDto } from '../dtos/request-context.dto';

export const RequestContext = createParamDecorator((_data: unknown, ctx: ExecutionContext): RequestContextDto => {
  const request = ctx.switchToHttp().getRequest();

  return createRequestContext(request);
});

export function createRequestContext(request: Request & { user: UserDto }): RequestContextDto {
  const ctx = new RequestContextDto();
  ctx.user = request.user ? plainToClass(UserDto, request.user, { excludeExtraneousValues: true }) : null;
  return ctx;
}
