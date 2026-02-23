import type { ShortLinkRepository } from '../../../domain/repositories/short-link.repository';
import { ShortCodeGenerator } from '../../service/shortcode-generator.service';
import { ShortLink } from '../../../domain/entities/short-link.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SHORTLINK_RESPOSITORY } from 'src/application/injection-tokens/short-link.token';
import { SHORTCODE_GENERATOR } from 'src/application/injection-tokens/shortcode-generator.token';

@Injectable()
export class EditShortLinkUseCase {
    constructor(
        @Inject(SHORTLINK_RESPOSITORY)
        private readonly shortLinkRepository: ShortLinkRepository
    ) { }

    async execute(id: number, status: boolean): Promise<ShortLink> {
        try {
            return await this.shortLinkRepository.edit(id, status);
        } catch (error) {
            throw new NotFoundException('Short link not found');
        }
    }
}