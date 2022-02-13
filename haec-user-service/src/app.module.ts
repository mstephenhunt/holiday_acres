import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './providers/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true, cache: true })],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
