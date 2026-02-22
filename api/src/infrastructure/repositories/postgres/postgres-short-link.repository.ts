import { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { ShortLink } from '../../../domain/entities/short-link.entity';
import { PrismaService } from '../../database/postgres/prisma.service';

export class PostgresShortLinkRepository implements ShortLinkRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: string): Promise<ShortLink | null> {
        const row = await this.prisma.shortLinkModel.findUnique({ where: { id } });
        return row ? ShortLink.restore(row) : null;
    }

    async findByShortCode(shortCode: string): Promise<ShortLink | null> {
        const row = await this.prisma.shortLinkModel.findUnique({
            where: { shortCode },
        });
        return row ? ShortLink.restore(row) : null;
    }

    async findByUserId(userId: string): Promise<ShortLink[]> {
        const rows = await this.prisma.shortLinkModel.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        return rows.map(row => ShortLink.restore(row));
    }

    async existsByShortCode(shortCode: string): Promise<boolean> {
        const count = await this.prisma.shortLinkModel.count({
            where: { shortCode },
        });
        return count > 0;
    }

    async save(link: ShortLink): Promise<void> {
        await this.prisma.shortLinkModel.create({
            data: {
                id: link.id,
                userId: link.userId,
                originalUrl: link.originalUrl,
                shortCode: link.shortCode,
                createdAt: link.createdAt,
                isActive: link.isActive,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.shortLinkModel.delete({ where: { id } });
    }
}