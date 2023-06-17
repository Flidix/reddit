import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {CreateTrendDto} from "../trend/dto/create-trend.dto";
import {Trend, TrendDocument} from "../trend/schema/trend.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Comment, CommentDocument} from "../trend/schema/comment.schema";
import {User, UserDocument} from "./entities/user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async createUser(userDto: CreateUserDto) {
    const user = await this.userModel.create(userDto);
    return user;
  }

  async getUsersByEmail(username: string) {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async getAll() {
    const users = await this.userModel.find();
    return users;
  }
  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user
  }

  async search(search: string): Promise<UserDocument[]> {
    const users = await this.userModel.find({
      username: { $regex: new RegExp(search, 'i') },
    });
    return users;
  }
}