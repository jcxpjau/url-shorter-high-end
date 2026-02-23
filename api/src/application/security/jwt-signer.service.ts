import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtSigner } from 'src/domain/repositories/jwt-sign.repository';

@Injectable()
export class JwtSignerService implements JwtSigner {
    private readonly secret = process.env.JWT_SECRET || 'secret-key';
    private readonly expiresIn = '1h';

    async sign(payload: { sub: string }): Promise<string> {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
    }

    async verify(token: string): Promise<any> {
        return jwt.verify(token, this.secret);
    }
}