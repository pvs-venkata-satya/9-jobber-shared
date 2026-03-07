import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';

export interface IErrorResponse {
  message: string;
  status: string;
  statusCode: number;
  comingFrom: string;
  serializedErrors(): IError;
}

export interface IError {
  message: string;
  status: string;
  statusCode: number;
  comingFrom: string;
}

export abstract class CustomError extends Error {
  abstract status: string;
  abstract statusCode: number;
  comingFrom: string;

  constructor(message: string, comingFrom: string) {
    super(message);
    this.comingFrom = comingFrom;
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
      comingFrom: this.comingFrom,
    };
  }
}

export class BadRequestError extends CustomError {
  status = ReasonPhrases.BAD_REQUEST;
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class NotFoundError extends CustomError {
  status = ReasonPhrases.NOT_FOUND
  statusCode = StatusCodes.NOT_FOUND;

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class InternalServerError extends CustomError {
  status = ReasonPhrases.INTERNAL_SERVER_ERROR;
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class UnauthorizedError extends CustomError {
  status = ReasonPhrases.UNAUTHORIZED;
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class ForbiddenError extends CustomError {
  status = ReasonPhrases.FORBIDDEN;
  statusCode = StatusCodes.FORBIDDEN;

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class FileTooLargeError extends CustomError {
  status = ReasonPhrases.REQUEST_TOO_LONG;
  statusCode = StatusCodes.REQUEST_TOO_LONG;

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export class UnsupportedMediaTypeError extends CustomError {
  status = ReasonPhrases.UNSUPPORTED_MEDIA_TYPE;
  statusCode = StatusCodes.UNSUPPORTED_MEDIA_TYPE;
  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
  }
}

export interface ErrorException extends Error {
  errorno?: number;
  code?: string;
  syscall?: string;
  path?: string;
  stack?: string;
}