import { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { CreateShortLinkInput } from '../../dto/links/create-short-link.input';
import { CreateShortLinkOutput } from '../../dto/links/create-short-link.output';
import { ShortLink } from '../../../domain/entities/short-link.entity';

export interface ShortCodeGenerator {
    generate(): string;
}

export interface CacheRepository {
    set(key: string, value: string): Promise<void>;
}

export class CreateShortLinkUseCase {
    constructor(
        private readonly shortLinkRepository: ShortLinkRepository,
        private readonly shortCodeGenerator: ShortCodeGenerator,
        private readonly cacheRepository: CacheRepository,
    ) { }

    async execute(input: CreateShortLinkInput): Promise<CreateShortLinkOutput> {
        let shortCode: string;
        let exists: boolean;

        do {
            shortCode = this.shortCodeGenerator.generate();
            const found = await this.shortLinkRepository.findByShortCode(shortCode);
            exists = !!found;
        } while (exists);

        const link = ShortLink.create({
            userId: input.userId,
            originalUrl: input.originalUrl,
            shortCode,
        });
        const savedLink = await this.shortLinkRepository.save(link);
        await this.cacheRepository.set(`short:${shortCode}`, savedLink.originalUrl);
        return savedLink;
    }
}