import { Injectable, NestMiddleware, Request, Response } from '@nestjs/common';
import { NextFunction } from 'express';
import { redirect } from 'next/dist/server/api-utils';
import * as bcrypt from 'bcrypt';
import { UserService } from './modules/user/services/user.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log('AuthCheck is running');
    function authCheck (req, res, next) {
      if (req.session.loggedin) {

          next();

      } else {

          req.session.destory();
          res.redirect('/login')

  }
    async function verifyUser(input: {
      email: string;
      password: string;
    }): Promise<boolean> {
      await this.userService.verifyUser()

      let user;
      try {
        const user = await this.prisma.user.findUnique({
          where: {
            email: input.email,
          },
        });
        if (await bcrypt.compare(input.password, user.hashedPass)) {
          return true;
        }
      } catch (error) {
        console.error(error);
      }
      return false;
    }

}
  }
}


// QUESTION: if the token is passed through the browser as a header, do we need to avoid escape characters?
