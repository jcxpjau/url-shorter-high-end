import { Controller, Get, Ip, Param, Req, Res } from '@nestjs/common';
import type { Response } from 'express';
import { RedirectUseCase } from 'src/application/usecases/redirect/redirect.usecase';

@Controller()
export class RedirectController {
    constructor(private readonly redirectUseCase: RedirectUseCase) { }

    @Get(':shortcode')
    async redirect(
        @Param('shortcode') shortcode: string,
        @Req() req: Request, 
        @Ip() ip: string,
        @Res() res: Response
    ) {
        const userAgent = req.headers['user-agent'] || 'unknown';
        const url = await this.redirectUseCase.execute(shortcode, userAgent, ip );
        if (!url) {
            return res.status(404).send('Short link not found');
        }
        return res.redirect(url);
    }
}