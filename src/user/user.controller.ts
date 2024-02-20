import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import loginDTO from './dto/login.dto';
import signUpDTO from './dto/signup.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/log-in')
  login(@Body() body: loginDTO): Promise<any> {
    return this.userService.login(body);
  }
  @Post('/sign-up')
  signUp(@Body() body: signUpDTO): Promise<any> {
    return this.userService.signUp(body);
  }
  @Post('/add-user')
  create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'size', required: false, description: 'Page size' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'filter by ho_ten',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('get-users')
  findAll(
    @Query('page') page?: number,
    @Query('size') size?: number,
    @Query('name') name?: string,
    @Req() req?,
  ): Promise<any> {
    console.log(req.user);
    if (page && size) {
      // Xử lý yêu cầu phân trang
      return this.userService.findAllByPage(page, size, name);
    } else if (name) {
      // Xử lý yêu cầu tìm kiếm theo tên
      return this.userService.searchByName(name);
    } else {
      // Xử lý yêu cầu lấy tất cả người dùng
      return this.userService.findAll();
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: number): Promise<any> {
    return this.userService.findOne(id);
  }
  // @Get('profile')
  // getProfile(@Req() req: Request) {
  //   const user = req.user;
  //   return { user };
  // }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('/remove/:userId')
  remove(@Param('userId') userId: number): Promise<any> {
    return this.userService.remove(userId);
  }
}
