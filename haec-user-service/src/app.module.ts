import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/controllers/user.controller';
import { PrismaService } from './providers/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './_middleware';


@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true, cache: true }), UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UserController);
  }
}
