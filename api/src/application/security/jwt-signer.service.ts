import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSigner } from 'src/domain/repositories/jwt-sign.repository';

@Injectable()
export class JwtSignerService implements JwtSigner {
    constructor(private readonly jwtService: JwtService) {}

    async sign(payload: { sub: number, email: string }): Promise<string> {
        return this.jwtService.signAsync(payload);
    }

    async verify(token: string): Promise<any> {
        return this.jwtService.verifyAsync(token);
    }
}