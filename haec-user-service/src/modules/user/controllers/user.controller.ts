import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {
  @Get('/user/test')
  getHello(): string {
    return 'yoyo';
  }
}
