import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import loginDTO from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import signUpDTO from './dto/signup.dto';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  prisma = new PrismaClient();

  async login(body: loginDTO): Promise<any> {
    let { tai_khoan, mat_khau } = body;
    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: {
        tai_khoan: tai_khoan,
      },
    });
    if (checkUser) {
      let isCorrectPass = bcrypt.compareSync(mat_khau, checkUser.mat_khau);
      if (isCorrectPass) {
        let payload = {
          tai_khoan: checkUser.tai_khoan,
          email: checkUser.email,
          loai_nguoi_dung: checkUser.loai_nguoi_dung,
        };
        let token = this.jwtService.sign(payload, {
          secret: this.configService.get<string>('SECRET_KEY'),
          expiresIn: this.configService.get<string>('EXPIRES_IN'),
        });
        return token;
      }
      return 'Password incorrect';
    }
    return 'User is not exist';
  }
  async signUp(body: signUpDTO): Promise<any> {
    let { tai_khoan, ho_ten, email, so_dt, mat_khau, loai_nguoi_dung } = body;
    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: {
        tai_khoan: tai_khoan,
      },
    });
    if (checkUser) {
      return 'User is existed!';
    } else {
      let encodePassword = bcrypt.hashSync(mat_khau, 10);
      let newUser = {
        tai_khoan,
        email,
        mat_khau: encodePassword,
        ho_ten,
        so_dt,
        loai_nguoi_dung: 'user',
      };
      await this.prisma.nguoiDung.create({
        data: newUser,
      });
    }
    return 'User is created';
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(skip: number, numSize: number, filter: string): Promise<any> {
    let data = await this.prisma.nguoiDung.findMany({
      where: {
        ho_ten: {
          contains: filter,
        },
      },
      skip: skip,
      take: numSize,
    });
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
