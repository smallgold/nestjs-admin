import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';

@Injectable()
export class WhitelistMiddleware implements NestMiddleware {
  private readonly allowedRoutes = ['/api/users', '/api/products'];

  use(req: Request, res: Response, next: NextFunction) {
    const url = req.url;
    if (this.allowedRoutes.includes(url)) {
      next();
    } else {
      passport.authenticate(
        'jwt',
        { session: false },
        async (err, user, info) => {
          if (err || !user) {
            return UnauthorizedException;
          }
          req.user = user;
          next();
        },
      )(req, res, next);
    }
  }
}
