import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class WhitelistMiddleware implements NestMiddleware {
  private readonly allowedRoutes = ['/api/users', '/api/products'];

  use(req: Request, res: Response, next: NextFunction) {
    const url = req.url;
    if (!this.allowedRoutes.includes(url)) {
      return res.status(403).send('Forbidden');
    }
    next();
  }
}
