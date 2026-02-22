import { Module } from '@nestjs/common';
import { AuthModule } from './interfaces/http/controllers/auth/auth.module';
import { ShortLinkController } from './interfaces/http/controllers/shortlink/shortlink.controller';
import { ShortLinkModule } from './interfaces/http/controllers/shortlink/shortlink.module';
import { UserModule } from './interfaces/http/controllers/user/user.module';

@Module({
    imports: [
        AuthModule,
        ShortLinkModule,
        UserModule
    ]
})
export class AppModule { }