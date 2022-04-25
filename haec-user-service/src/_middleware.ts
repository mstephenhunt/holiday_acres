import { Injectable, NestMiddleware, Request, Response } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware Authentication is running");
    if (req.headers["haec-auth-token"] === "neither-is-this-a-secret-key") {
      console.log("success!!");
      next();
    }
    // Need to add in rejection case
    // console.log("error");
    // next();
  }
}
