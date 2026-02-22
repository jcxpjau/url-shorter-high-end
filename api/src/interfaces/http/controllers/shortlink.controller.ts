import { Body, Controller, Get, Param, Post, Delete, Req } from '@nestjs/common';
import { CreateShortLinkUseCase } from '../../../application/usecases/shortlink/create-shortlink.usecase';
import { DeleteShortLinkUseCase } from '../../../application/usecases/shortlink/delete-shortlink.usecase';
import { ListUserShortLinksUseCase } from '../../../application/usecases/shortlink/list-user.shortlink.usecase';

@Controller('short-links')
export class ShortLinkController {
    constructor(
        private readonly createShortLink: CreateShortLinkUseCase,
        private readonly deleteShortLink: DeleteShortLinkUseCase,
        private readonly listUserShortLinks: ListUserShortLinksUseCase,
    ) { }

    @Post()
    async create(@Body() body: { userId: string; originalUrl: string }) {
        return this.createShortLink.execute(body);
    }

    @Get('user/:userId')
    async list(@Param('userId') userId: string) {
        return this.listUserShortLinks.execute({ userId });
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Req() req: any) {
        const userId = req.user.id;
        return this.deleteShortLink.execute({ shortLinkId: id, userId });
    }
}