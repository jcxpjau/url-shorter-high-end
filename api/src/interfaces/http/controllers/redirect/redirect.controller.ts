import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { RedirectUseCase } from 'src/application/usecases/redirect/redirect.usecase';

@Controller()
export class RedirectController {
    constructor(private readonly redirectUseCase: RedirectUseCase) { }

    @Get(':shortcode')
    async redirect(
        @Param('shortcode') shortcode: string,
        @Res() res: Response
    ) {
        const url = await this.redirectUseCase.execute(shortcode);
        if (!url) {
            return res.status(404).send('Short link not found');
        }
        return res.redirect(url);
    }
}