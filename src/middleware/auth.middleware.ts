// auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    // Lấy token từ header Authorization
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)
    const secret = process.env.SECRET_KEY;

    if (token) {
      try {
        // Giải mã token
        const decodedToken = jwt.verify(token, secret);

        // Gắn thông tin tài khoản vào request để sử dụng trong các route tiếp theo
        req.user = decodedToken;

        next();
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      return res.status(401).json({ message: 'Token not found' });
    }
  }
}
