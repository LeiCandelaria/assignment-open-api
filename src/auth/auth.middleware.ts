import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly validApiKey = 'a956635aa5msh64d519eeb5cd21bp1876dcjsn35c507c13e28'; // SECRET API KEY//
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== this.validApiKey) {
      return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }

    next();
  }
}