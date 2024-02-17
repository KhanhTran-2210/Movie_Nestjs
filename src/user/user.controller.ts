import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import loginDTO from './dto/login.dto';
import signUpDTO from './dto/signup.dto';

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
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/get-list/:page/:size')
  findAll(
    @Param('page') page,
    @Param('size') size,
    @Query('filter') filter,
  ): Promise<any> {
    let numPage = Number(page);
    let numSize = Number(size);
    let skip = (numPage - 1) * numSize;
    return this.userService.findAll(skip, numSize, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
