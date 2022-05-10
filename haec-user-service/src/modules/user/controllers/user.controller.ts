import { Controller, Get, Post, Header, Body, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';

type CreateUserDto = {
  email: string;
  password: string;
  name?: string;
};

type SerializedUser = {
  id: number;
  email: string;
  name?: string;
};

type VerifyUserDto = {
  id: number;
  email: string;
  password: string;
};

type VerifyUserTokenDto = {
  email: string;
  token: string;
};

type LoginUserDto = {
  email: string;
  password: string;
};

type LogoutUserDto = {
  email: string;
};

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/user/:id')
  async getUser(@Param() params): Promise<SerializedUser> {
    const user = await this.userService.getUser({ id: parseInt(params.id) });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  @Post('/user')
  @Header('content-type', 'application/json')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SerializedUser> {
    const createdUser = await this.userService.createUser({
      email: createUserDto.email,
      password: createUserDto.password,
      name: createUserDto.name,
    });

    return {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
    };
  }

  @Post('/user/verify')
  @Header('content-type', 'application/json')
  async verifyUser(@Body() verifyUserDto: VerifyUserDto): Promise<boolean> {
    const verifiedUser = await this.userService.verifyUser({
      email: verifyUserDto.email,
      password: verifyUserDto.password,
    });
    return verifiedUser;
  }

  @Post('/user/verifyToken')
  @Header('content-type', 'application/json')
  async verifyUserToken(@Body() verifyUserTokenDto: VerifyUserTokenDto): Promise<boolean> {
    const verifiedUserToken = await this.userService.verifyUserToken({
      email: verifyUserTokenDto.email,
      token : verifyUserTokenDto.token,
    });
    return verifiedUserToken;
  }

  @Post('/user/login')
  @Header('content-type', 'application/json')
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<string> {
    const loggedInUser = await this.userService.loginUser({
      email: loginUserDto.email,
      password: loginUserDto.password,
    });
    return loggedInUser;
  }

  @Post('/user/logout')
  @Header('content-type', 'application/json')
  async logoutUser(@Body() logoutUserDto: LogoutUserDto): Promise<void> {
    const loggedOutUser = await this.userService.logoutUser({
      email: logoutUserDto.email,
    });
  }
}
