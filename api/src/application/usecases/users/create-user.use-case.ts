import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';

interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(data: CreateUserDTO): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const user = new User(data.name, data.email, data.password);
        await this.userRepository.save(user);
        return user;
    }
}