import { ApiProperty } from '@nestjs/swagger';

export class CreateShortLinkDto {
    @ApiProperty({ description: 'ID do usuário dono do link' })
    userId: number;

    @ApiProperty({ description: 'URL original que será encurtada' })
    originalUrl: string;
}