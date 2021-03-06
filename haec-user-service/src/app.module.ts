import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { UserService } from './modules/user/services/user.service';
import { UserController } from './modules/user/controllers/user.controller';
import { PrismaService } from './providers/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationMiddleware } from './_middleware';


@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true, cache: true })],
  controllers: [],
  providers: [PrismaService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(UserController);
  }
}
