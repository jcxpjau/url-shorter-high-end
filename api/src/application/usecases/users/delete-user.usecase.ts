import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import type { UserRepository } from '../../../domain/repositories/user.repository';
import { USER_REPOSITORY } from 'src/application/injection-tokens/user-repository.token';

interface DeleteUserInput {
    id: number;
    userId: number
}

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject( USER_REPOSITORY )
        private readonly userRepository: UserRepository,
    ) { }

    async execute(input: DeleteUserInput ): Promise<void> {
        if( input.id !== input.userId ) {
            throw new UnauthorizedException( "Unauthorized" );
        }
        const exists = await this.userRepository.findById(input.id);
        if (!exists) {
            throw new NotFoundException('User not found');
        }
        await this.userRepository.delete(input.id);
    }
}