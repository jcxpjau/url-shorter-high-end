import { UserRepository } from '../../../domain/repositories/user.repository';

interface DeleteUserInput {
    id: string;
}

export class DeleteUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(input: DeleteUserInput): Promise<void> {
        const exists = await this.userRepository.findById(input.id);

        if (!exists) {
            throw new Error('User not found');
        }

        await this.userRepository.delete(input.id);
    }
}