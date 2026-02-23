import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetLinkStatsUseCase } from 'src/application/usecases/click-events/get-link-stats.usecase';

@ApiTags('Stats')
@Controller('stats-links')
export class StatsController {
    constructor(
        private readonly getLinkStats: GetLinkStatsUseCase
    ) { }

    
    @Get('link/:id')
    @ApiOperation({ summary: 'List short links for a user' })
    @ApiResponse({ status: 200, description: 'List of short links' })
    async list(
        @Param('id', ParseIntPipe) id: number, 
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) 
    {
        return this.getLinkStats.execute(id, Number(page), Number(limit));
    }
}