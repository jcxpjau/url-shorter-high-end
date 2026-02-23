import { Module } from '@nestjs/common';
import { AuthModule } from './interfaces/http/controllers/auth/auth.module';
import { ShortLinkController } from './interfaces/http/controllers/shortlink/shortlink.controller';
import { ShortLinkModule } from './interfaces/http/controllers/shortlink/shortlink.module';
import { UserModule } from './interfaces/http/controllers/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { StatsModule } from './interfaces/http/controllers/stats/stats.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        ShortLinkModule,
        UserModule,
        StatsModule
    ]
})
export class AppModule { }