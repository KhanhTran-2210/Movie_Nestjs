import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class CheckRoleAdminMiddleware implements NestMiddleware {
    use(req: any, res: Response, next: Function) {
        let user = req.user;
        let loai_nguoi_dung = user.loai_nguoi_dung;
        if (loai_nguoi_dung == 'admin') {
            next();
        } else {
            return res.status(401).json({ message: 'User is not admin' });
        }
        
    }
}