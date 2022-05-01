import { Injectable, NestMiddleware, Request, Response } from '@nestjs/common';
import { NextFunction } from 'express';

// environment variable
const secret_key = process.env.SECRET_MIDDLE_KEY

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware Authentication is running");
    // Middleware Authentication SUCCESS
    if (req.headers["haec-auth-token"] === secret_key) {
      console.log("Middleware Authentication Passed");
      next();
    }
    // Middleware Authentication FAIL
    else {
      throw("Middleware Authentication Failed")
      }
  }
}
