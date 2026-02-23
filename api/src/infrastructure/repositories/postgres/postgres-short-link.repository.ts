import { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { ShortLink } from '../../../domain/entities/short-link.entity';
import { PrismaService } from '../../database/postgres/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgresShortLinkRepository implements ShortLinkRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: number): Promise<ShortLink | null> {
        const row = await this.prisma.shortLinkModel.findUnique({ where: { id } });
        return row ? ShortLink.restore(row) : null;
    }

    async findByShortCode(shortCode: string): Promise<ShortLink | null> {
        const row = await this.prisma.shortLinkModel.findUnique({
            where: { shortCode },
        });
        return row ? ShortLink.restore(row) : null;
    }

    async findByUserId(userId: number): Promise<ShortLink[]> {
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

    async edit(id: number, status: boolean): Promise<ShortLink> {
        const row = await this.prisma.shortLinkModel.update({
            where: { id },
            data: { isActive: status },
        });
        return ShortLink.restore(row);
    }

    async save(link: ShortLink): Promise<ShortLink> {
        const row = await this.prisma.shortLinkModel.create({
            data: {
                userId: link.userId,
                originalUrl: link.originalUrl,
                shortCode: link.shortCode,
                createdAt: link.createdAt,
                isActive: link.isActive,
            },
        });
        return ShortLink.restore(row);
    }

    async delete(id: number): Promise<void> {
        await this.prisma.shortLinkModel.delete({ where: { id } });
    }
}