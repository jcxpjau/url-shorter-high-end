import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { PrismaService } from '../../database/postgres/prisma.service';

export class PostgresUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmail(email: string): Promise<User | null> {
        const row = await this.prisma.userModel.findUnique({ where: { email } });
        return row
            ? new User({
                id: row.id,
                email: row.email,
                passwordHash: row.passwordHash,
                createdAt: row.createdAt,
            })
            : null;
    }

    async findById(id: string): Promise<User | null> {
        const row = await this.prisma.userModel.findUnique({ where: { id } });
        return row
            ? new User({
                id: row.id,
                email: row.email,
                passwordHash: row.passwordHash,
                createdAt: row.createdAt,
            })
            : null;
    }

    async save(user: User): Promise<void> {
        await this.prisma.userModel.create({
            data: {
                id: user.id,
                email: user.email,
                passwordHash: user.passwordHash,
                createdAt: user.createdAt,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.userModel.delete({
            where: { id },
        });
    }
}