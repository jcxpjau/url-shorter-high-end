import { UserRepository } from '../../../domain/repositories/user.repository';

interface GetUserInput {
    id: string;
}

export class GetUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(input: GetUserInput) {
        const user = await this.userRepository.findById(input.id);

        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
        };
    }
}