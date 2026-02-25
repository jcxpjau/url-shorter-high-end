import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { DomainError } from 'src/shared/errors/domain.error';
import { logger } from 'src/shared/logger/pino.logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const requestId = request.headers['x-request-id'];

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errorCode = 'INTERNAL_ERROR';

        if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            if (exception.code === 'P2002') {
                status = HttpStatus.CONFLICT;
                message = 'Unique constraint failed on the database';
                errorCode = 'DUPLICATED_RECORD';
            }
        }

        else if (exception instanceof DomainError) {
            status = HttpStatus.BAD_REQUEST;
            message = exception.message;
            errorCode = 'DOMAIN_ERROR';
        }

        else if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message = typeof res === 'string' ? res : (res as any).message || exception.message;
            errorCode = 'HTTP_ERROR';
        }

        if (status !== HttpStatus.NOT_FOUND) {
            logger.error({
                requestId,
                err: exception instanceof Error ? {
                    message: exception.message,
                    stack: exception.stack,
                } : exception,
                path: request.url,
                method: request.method,
                statusCode: status,
            }, `[ExceptionFilter] ${message}`);
        } else {
            logger.warn(`404 na rota: ${request.url}`);
        }

        logger.error({
            requestId,
            err: exception instanceof Error ? {
                message: exception.message,
                stack: exception.stack,
            } : exception,
            path: request.url,
            method: request.method,
            statusCode: status,
        }, `[ExceptionFilter] ${message}`);

        response.status(status).json({
            requestId,
            success: false,
            statusCode: status,
            errorCode,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}