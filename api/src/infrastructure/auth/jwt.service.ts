import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { StringValue } from 'ms';

export class JwtService {
    constructor(
        private readonly secret: Secret,
        private readonly expiresIn: StringValue | number,
    ) { }

    sign(payload: { sub: string }): string {
        const options: SignOptions = {
            algorithm: 'HS256',
            expiresIn: this.expiresIn,
        };

        return jwt.sign(payload, this.secret, options);
    }
}