export const HttpExceptions = Object.freeze({
    InternalServerException: 'InternalServerException',
    NotImplementedException: 'NotImplementedException',
    BadRequestException: 'BadRequestExecption',
    ForbiddenException: 'ForbiddenException',
    UnsupportedMediaTypeException: 'UnsupportedMediaTypeException',
    UnauthorizedException: 'UnauthorizedException',
    NotFoundException: 'NotFoundException'
});

export const HttpExceptionCodes = Object.freeze({
    InternalServerException: 500,
    NotImplementedException: 501,
    BadRequestException: 400,
    ForbiddenException: 403,
    UnsupportedMediaTypeException: 415,
    UnauthorizedException: 401,
    NotFoundException: 404,
});

export const HttpExceptionNames = Object.freeze({
    InternalServerException: 'INTERNAL_SERVER_ERROR',
    NotImplementedException: 'NOT_IMPLEMENTED',
    BadRequestException: 'BAD_REQUEST',
    ForbiddenException: 'FORBIDDEN',
    UnsupportedMediaTypeException: 'UNSUPPORTED_MEDIA_TYPE',
    UnauthorizedException: 'UNAUTHORIZED',
    NotFoundException: 'NOT_FOUND',
});