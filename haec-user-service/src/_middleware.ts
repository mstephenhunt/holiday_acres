import { Injectable, NestMiddleware, Request, Response } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware Authentication is running");
    // Middleware Authentication SUCCESS
    if (req.headers["haec-auth-token"] === "neither-is-this-a-secret-key") {
      console.log("Middleware Authentication Passed");
      next();
    }
    // Middleware Authentication FAIL
    else {
      throw("Middleware Authentication Failed")
      }
  }
}
