import { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { ShortCodeGenerator } from '../../service/shortcode-generator.service';
import { ShortLink } from '../../../domain/entities/short-link.entity';

interface CreateShortLinkInput {
    userId: string;
    originalUrl: string;
}

export class CreateShortLinkUseCase {
    constructor(
        private readonly shortLinkRepository: ShortLinkRepository,
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