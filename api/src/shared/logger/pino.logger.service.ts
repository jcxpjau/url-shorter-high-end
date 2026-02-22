import { LoggerService } from '@nestjs/common';
import pino from 'pino';

const pinoLogger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport:
        process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
});

export class PinoLoggerService implements LoggerService {
    log(message: string, ...optionalParams: any[]) {
        pinoLogger.info(message, ...optionalParams);
    }

    error(message: string, ...optionalParams: any[]) {
        pinoLogger.error(message, ...optionalParams);
    }

    warn(message: string, ...optionalParams: any[]) {
        pinoLogger.warn(message, ...optionalParams);
    }

    debug?(message: string, ...optionalParams: any[]) {
        pinoLogger.debug(message, ...optionalParams);
    }

    verbose?(message: string, ...optionalParams: any[]) {
        pinoLogger.info(message, ...optionalParams);
    }
}

export const logger = new PinoLoggerService();