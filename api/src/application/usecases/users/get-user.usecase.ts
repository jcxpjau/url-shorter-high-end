import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import type { UserRepository } from '../../../domain/repositories/user.repository';
import { USER_REPOSITORY } from 'src/application/injection-tokens/user-repository.token';

interface GetUserInput {
    id: number;
    userId: number;
}

@Injectable()
export class GetUserUseCase {
    constructor(
        @Inject( USER_REPOSITORY )
        private readonly userRepository: UserRepository,
    ) { }

    async execute(input: GetUserInput) {
        if( input.id !== input.userId ) {
            throw new UnauthorizedException( "Unauthorized" );
        }
        const user = await this.userRepository.findById(input.id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };
    }
}