import { ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';
import { Catch, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { QueryFailedError } from 'typeorm';
import { constraintErrors } from '../constants';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter implements ExceptionFilter<QueryFailedError> {
  private logger = new Logger(QueryFailedErrorFilter.name);

  constructor(public reflector: Reflector) {}

  catch(exception: QueryFailedError & { constraint?: string }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getResponse<Request>();
    const response = ctx.getResponse<Response>();

    // console.log("Exception", exception);

    // TODO: Query filter a ar ki ki ace dekte hobe
    const status = exception.constraint?.startsWith('UQ') ? HttpStatus.CONFLICT : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorType = STATUS_CODES[status] || 'UNEXPECTED_ERROR';

    const message = exception.constraint ? constraintErrors[exception.constraint] : undefined;

    this.logger.error(message);

    return response.status(status).json({
      statusCode: status,
      errorType,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
