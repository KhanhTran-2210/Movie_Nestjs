// auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.SECRET_KEY;
    console.log('test');
    next();

    // if (token) {
    //   jwt.verify(token, secret, (err, decoded) => {
    //     if (err) {
    //       return res.status(401).json({ message: 'Unauthorized' });
    //     } else {
    //       req.user = decoded;
    //       next();
    //     }
    //   });
    // } else {
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }
  }
}
