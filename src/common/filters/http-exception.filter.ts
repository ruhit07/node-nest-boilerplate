import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { ErrorType } from '../enums';
import { Response } from 'express';
import { STATUS_CODES } from 'http';
import { Reflector } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  constructor(public reflector: Reflector) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const statusCode = +exception.getStatus();

    let { errorType, message } = exception.getResponse() as {
      errorType: ErrorType | string;
      message: string | string[];
    };

    if (!errorType) {
      errorType = STATUS_CODES[statusCode] || 'UNEXPECTED_ERROR';
    }

    this.logger.error(message);

    return response.status(statusCode).json({
      statusCode,
      errorType,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
