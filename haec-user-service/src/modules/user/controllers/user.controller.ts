import { Controller, Get, Post, Header, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';

type CreateUserDto = {
  email: string;
  name?: string;
}

type SerializedUser = {
  id: number;
  email: string;
  name?: string;
}

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/user/test')
  getHello(): string {
    return 'yoyo';
  }

  @Post('/user')
  @Header('content-type', 'application/json')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<SerializedUser> {
    const createdUser = await this.userService.createUser({
      email: createUserDto.email,
      name: createUserDto.name
    });

    return {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name
    }
  }
}
