import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './interfaces/http/controllers/auth/auth.module';
import { RedirectModule } from './interfaces/http/controllers/redirect/redirect.module';
import { ShortLinkModule } from './interfaces/http/controllers/shortlink/shortlink.module';
import { StatsModule } from './interfaces/http/controllers/stats/stats.module';
import { UserModule } from './interfaces/http/controllers/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        ShortLinkModule,
        UserModule,
        StatsModule,
        RedirectModule
    ]
})
export class AppModule { }