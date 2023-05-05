import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class WhitelistMiddleware implements NestMiddleware {
    private readonly allowedRoutes;
    use(req: Request, res: Response, next: NextFunction): void;
}
