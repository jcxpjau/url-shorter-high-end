import { UserRepository } from '../../../domain/repositories/user.repository';
import { LoginInput } from '../../dto/auth/login.input';
import { LoginOutput } from '../../dto/auth/login.output';

export interface PasswordComparer {
    compare(password: string, hash: string): Promise<boolean>;
}

export interface JwtSigner {
    sign(payload: { sub: string }): Promise<string>;
}

export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordComparer: PasswordComparer,
        private readonly jwtSigner: JwtSigner,
    ) { }

    async execute(input: LoginInput): Promise<LoginOutput> {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const valid = await this.passwordComparer.compare(
            input.password,
            user.passwordHash,
        );

        if (!valid) {
            throw new Error('Invalid credentials');
        }

        const token = await this.jwtSigner.sign({ sub: user.id });

        return { accessToken: token };
    }
}