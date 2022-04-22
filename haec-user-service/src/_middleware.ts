import { Injectable, NestMiddleware, Request, Response } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    console.log('`Use` is running!');
    console.log(req.headers);
    next();
  }
}



// QUESTION: if the token is passed through the browser as a header, do we need to avoid escape characters?
