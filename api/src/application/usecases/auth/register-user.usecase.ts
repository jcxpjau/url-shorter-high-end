import { UserRepository } from '../../../domain/repositories/user.repository';
import { RegisterUserInput } from '../../dto/auth/register-user.input';
import { RegisterUserOutput } from '../../dto/auth/register-user.output';
import { User } from '../../../domain/entities/user.entity';

export interface PasswordHasher {
    hash(password: string): Promise<string>;
}

export class RegisterUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
    ) { }

    async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
        const existing = await this.userRepository.findByEmail(input.email);
        if (existing) {
            throw new Error('Email already in use');
        }

        const passwordHash = await this.passwordHasher.hash(input.password);

        const user = new User({
            id: crypto.randomUUID(),
            email: input.email,
            passwordHash,
            createdAt: new Date(),
        });

        await this.userRepository.save(user);

        return {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
        };
    }
}