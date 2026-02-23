import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PASSWORD_HASH } from 'src/application/injection-tokens/password-comparer.token';
import { USER_REPOSITORY } from 'src/application/injection-tokens/user-repository.token';
import type { PasswordHasherRespository } from 'src/domain/repositories/password-hasher.repository';
import type { UserRepository } from '../../../domain/repositories/user.repository';
import { LoginInput } from '../../dto/auth/login.input';
import { LoginOutput } from '../../dto/auth/login.output';
import type { JwtSigner } from 'src/domain/repositories/jwt-sign.repository';
import { JWT_SIGN } from 'src/application/injection-tokens/jwt-sign.token';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(PASSWORD_HASH)
        private readonly passwordHasher: PasswordHasherRespository,
        @Inject(JWT_SIGN)
        private readonly jwtSigner: JwtSigner,
    ) { }

    async execute(input: LoginInput): Promise<LoginOutput> {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            throw new UnauthorizedException( "Invalid Credentials" )
        }
        const valid = await this.passwordHasher.compare(
            input.password,
            user.passwordHash,
        );
        if (!valid) {
            throw new UnauthorizedException( "Invalid Credentials" )
        }
        const token = await this.jwtSigner.sign({ sub: user.email });
        return { accessToken: token };
    }
}