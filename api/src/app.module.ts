import { Module } from '@nestjs/common';
import { AuthModule } from './interfaces/http/controllers/auth/auth.module';

@Module({
  imports: [AuthModule],
})
export class AppModule {}