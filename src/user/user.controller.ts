import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {User} from "./entities/user.schema";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Get()
  getAll(){
    return this.userService.getAll()
  }
  @Get(':username')
  getOne(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }

  @Get('searchUser')
  search(@Query('search') search: string) {
    return this.userService.search(search);
  }

}
