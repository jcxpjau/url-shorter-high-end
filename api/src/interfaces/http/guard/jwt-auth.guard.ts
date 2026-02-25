import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { logger } from 'src/shared/logger/pino.logger.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Missing authorization header');
        }
        const [type, token] = authHeader.split(' ');

        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedException('Invalid token format');
        }
        try {
            const payload = this.jwtService.verify(token);
            request['user'] = { id: payload.sub || payload.id };
            return true;
        } catch (error) {
            throw new UnauthorizedException('Token expired or invalid');
        }
    }
}