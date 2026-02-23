import type { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { ShortCodeGenerator } from '../../service/shortcode-generator.service';
import { ShortLink } from '../../../domain/entities/short-link.entity';
import { Inject, Injectable } from '@nestjs/common';
import { SHORTLINK_RESPOSITORY } from 'src/application/injection-tokens/short-link.token';
import { SHORTCODE_GENERATOR } from 'src/application/injection-tokens/shortcode-generator.token';

interface CreateShortLinkInput {
    userId: number;
    originalUrl: string;
}

@Injectable()
export class CreateShortLinkUseCase {
    constructor(
        @Inject( SHORTLINK_RESPOSITORY )
        private readonly shortLinkRepository: ShortLinkRepository,
        @Inject( SHORTCODE_GENERATOR )
        private readonly shortCodeGenerator: ShortCodeGenerator,
    ) { }

    async execute(input: CreateShortLinkInput): Promise<ShortLink> {
        let shortCode: string;

        do {
            shortCode = this.shortCodeGenerator.generate();
        } while (await this.shortLinkRepository.existsByShortCode(shortCode));

        const shortLink = ShortLink.create({
            userId: input.userId,
            originalUrl: input.originalUrl,
            shortCode,
        });

        await this.shortLinkRepository.save(shortLink);

        return shortLink;
    }
}