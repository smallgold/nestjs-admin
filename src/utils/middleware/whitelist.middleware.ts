import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';

@Injectable()
export class WhitelistMiddleware implements NestMiddleware {
  private readonly allowedRoutes = ['/users', '/users/captcha', '/auth/login'];
  use(req: Request, res: Response, next: NextFunction) {
    const url = req.baseUrl;
    if (this.allowedRoutes.includes(url)) {
      next();
    } else {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
          throw new UnauthorizedException('Invalid credentials');
        }
        req.user = user;
        next();
      })(req, res, next);
    }
  }
}
