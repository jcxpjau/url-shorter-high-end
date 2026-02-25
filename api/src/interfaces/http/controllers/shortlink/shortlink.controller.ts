import { EditShortLinkUseCase } from './../../../../application/usecases/shortlink/edit-shortlink.usecase';
import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateShortLinkUseCase } from '../../../../application/usecases/shortlink/create-shortlink.usecase';
import { DeleteShortLinkUseCase } from '../../../../application/usecases/shortlink/delete-shortlink.usecase';
import { ListUserShortLinksUseCase } from '../../../../application/usecases/shortlink/list-user.shortlink.usecase';
import { CreateShortLinkDto } from './shortlink.dto';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('ShortLinks')
@Controller('short-links')
export class ShortLinkController {
    constructor(
        private readonly createShortLink: CreateShortLinkUseCase,
        private readonly deleteShortLink: DeleteShortLinkUseCase,
        private readonly listUserShortLinks: ListUserShortLinksUseCase,
        private readonly editShortLinkUseCase: EditShortLinkUseCase
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a short link' })
    @ApiBody({ type: CreateShortLinkDto })
    @ApiResponse({ status: 201, description: 'Short link created' })
    async create(@Body() body: CreateShortLinkDto) {
        return this.createShortLink.execute(body);
    }

    @Patch(':id/:status')
    async edit(
        @Param('id', ParseIntPipe) id: number,
        @Query('isActive') status: string,
        @Req() req: any 
    ) {
        console.log( req.user );
        const isActive = status === 'true';
        return this.editShortLinkUseCase.execute(id, req.user.id, isActive);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'List short links for a user' })
    @ApiParam({ name: 'userId', type: Number })
    @ApiResponse({ status: 200, description: 'List of short links' })
    async list(@Param('userId', ParseIntPipe) userId: number) {
        return this.listUserShortLinks.execute({ userId });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a short link' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Short link deleted' })
    async delete(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
        return this.deleteShortLink.execute({ shortLinkId: id, userId: req.user.id });
    }
}