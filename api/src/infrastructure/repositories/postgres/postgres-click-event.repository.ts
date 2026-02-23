import { ClickEventRepository } from '../../../domain/repositories/click-event.repository';
import { ClickEvent } from '../../../domain/entities/click-event.entity';
import { PrismaService } from '../../database/postgres/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgresClickEventRepository implements ClickEventRepository {
    constructor(private readonly prisma: PrismaService) { }

    async countByShortLinkId(shortLinkId: number): Promise<number> {
        return this.prisma.clickEventModel.count({
            where: { shortLinkId },
        });
    }

    async findByShortLinkId(
        shortLinkId: number,
        page: number,
        limit: number,
    ): Promise<ClickEvent[]> {
        const rows = await this.prisma.clickEventModel.findMany({
            where: { shortLinkId },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
        });

        return rows.map(row => new ClickEvent(row));
    }

    async save(event: ClickEvent): Promise<void> {
        await this.prisma.clickEventModel.create({
            data: { ...event },
        });
    }
}