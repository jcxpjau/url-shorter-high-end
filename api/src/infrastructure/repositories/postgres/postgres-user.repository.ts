import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { PrismaService } from '../../database/postgres/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgresUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmail(email: string): Promise<User | null> {
        const row = await this.prisma.userModel.findUnique({ where: { email } });
        return row
            ? new User({
                id: row.id,
                name: row.name,
                email: row.email,
                password: row.password,
                createdAt: row.createdAt,
            })
            : null;
    }

    async findById(id: number): Promise<User | null> {
        const row = await this.prisma.userModel.findUnique({ where: { id } });
        return row
            ? new User({
                id: row.id,
                name: row.name,
                email: row.email,
                password: row.password,
                createdAt: row.createdAt,
            })
            : null;
    }

    async save(user: User): Promise<void> {
        await this.prisma.userModel.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.passwordHash,
                createdAt: user.createdAt,
            },
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.userModel.delete({
            where: { id },
        });
    }
}