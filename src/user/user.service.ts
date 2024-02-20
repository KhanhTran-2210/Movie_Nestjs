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
  async create(createUserDto: CreateUserDto): Promise<any> {
    const { mat_khau, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hashSync(mat_khau, 10);
    const newUser = {
      ...rest,
      mat_khau: hashedPassword,
    };
    await this.prisma.nguoiDung.create({
      data: newUser,
    });
    return 'Create successfully';
  }

  async findAll(): Promise<any> {
    return await this.prisma.nguoiDung.findMany();
  }

  async findAllByPage(page: number, size: number, name?: string): Promise<any> {
    const skip = (page - 1) * size;
    const whereClause: any = {};
    if (name) {
      whereClause.ho_ten = { contains: name };
    }
    return await this.prisma.nguoiDung.findMany({
      where: whereClause,
      skip,
      take: +size,
    });
  }

  async searchByName(name: string): Promise<any> {
    return await this.prisma.nguoiDung.findMany({
      where: {
        ho_ten: {
          contains: name,
        },
      },
    });
  }

  async findOne(id: number): Promise<any> {
    return await this.prisma.nguoiDung.findUnique({
      where: { nguoi_dung_id: +id },
    });
  }
  // getUserProfile(req: Request): any {
  //   return req.user;
  // }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { nguoi_dung_id: id },
    });
    if (!user) {
      return `User with ID ${id} not found`;
    }
    if (updateUserDto.mat_khau) {
      const hashedPassword = await bcrypt.hashSync(updateUserDto.mat_khau, 10);

      updateUserDto.mat_khau = hashedPassword;
    }
    const updatedUser = await this.prisma.nguoiDung.update({
      where: { nguoi_dung_id: id },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async remove(userId: number): Promise<any> {
    await this.prisma.datVe.deleteMany({
      where: {
        nguoi_dung_id: +userId,
      },
    });
    await this.prisma.nguoiDung.delete({
      where: {
        nguoi_dung_id: +userId,
      },
    });
    return 'Remove user successfully';
  }
}
