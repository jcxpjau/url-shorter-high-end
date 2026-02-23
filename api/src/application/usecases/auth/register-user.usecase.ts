import type { UserRepository } from '../../../domain/repositories/user.repository';
import { RegisterUserInput } from '../../dto/auth/register-user.input';
import { RegisterUserOutput } from '../../dto/auth/register-user.output';
import { User } from '../../../domain/entities/user.entity';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/application/injection-tokens/user-repository.token';
import * as argon2 from 'argon2';
import { PASSWORD_HASH } from 'src/application/injection-tokens/password-comparer.token';
import type { PasswordHasherRespository } from 'src/domain/repositories/password-hasher.repository';


@Injectable()
export class RegisterUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        @Inject(PASSWORD_HASH)
        private readonly passwordHash: PasswordHasherRespository
    ) { }

    async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
        const existing = await this.userRepository.findByEmail(input.email);
        if (existing) {
            throw new ConflictException('Email already in use');
        }
        const passwordHash = await this.passwordHash.hash(input.password);
        
        const user = new User({
            name: input.name,
            email: input.email,
            password: passwordHash,
            createdAt: new Date(),
        });
        await this.userRepository.save(user);
        return {
            email: user.email,
            createdAt: user.createdAt,
        };
    }
}