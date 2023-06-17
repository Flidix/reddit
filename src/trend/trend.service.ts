import {forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { CreateTrendDto } from './dto/create-trend.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Trend, TrendDocument } from './schema/trend.schema';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtService } from '@nestjs/jwt';
import {UserService} from "../user/user.service";
import {Likes, LikesDocument} from "./schema/like.schema";
import {AddCommentToCommentDto} from "./dto/add-commentToComment.dto";
import {CommentIn, CommentInDocument} from "./schema/comment.In.schema";
import {CommentLikes, CommentLikesDocument} from "./schema/comment-like.schema";



@Injectable()
export class TrendService {
  constructor(
      @InjectModel(Trend.name) private trendModel: Model<TrendDocument>,
      @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
      @InjectModel(CommentIn.name) private commentInModel: Model<CommentInDocument>,

      @InjectModel(CommentLikes.name) private commentLikeModel: Model<CommentLikesDocument>,

      @InjectModel(Likes.name) private likeModel: Model<LikesDocument>,

      @Inject(forwardRef(() => UserService)) private userService: UserService, // Додайте UserService як залежність

      private jwtService: JwtService,
  ) {}


  async create(dto: CreateTrendDto, token: string): Promise<Trend> {
    const { username, id } = this.jwtService.verify(token); // Отримайте ім'я користувача та його ID з JWT-токену
    const trend = await this.trendModel.create({ ...dto, username: username, userId: id }); // Додайте ID користувача до тренду
    const user = await this.userService.getUsersByEmail(username);
    user.trends.push(trend); // Додайте створений тренд до масиву трендів у користувача
    await user.save(); // Збережіть зміни в користувача

    return trend;
  }

  async findAll(): Promise<Trend[]> {
    const trends = await this.trendModel.find().sort({ likesCount: -1 }).exec();
    return trends;
  }

  async search(query: string): Promise<Trend[]> {
    const trend = await this.trendModel.find({
      title: { $regex: new RegExp(query, 'i') },
    });
    return trend;
  }

  async addCommen t(dto: CreateCommentDto, token: string): Promise<Comment> {
    const { username } = await this.jwtService.verify(token);
    const trend = await this.trendModel.findById(dto.trendId);
    const comment = await this.commentModel.create({ ...dto, username: username });
    trend.comment.push(comment);
    await trend.save();
    await comment.save();
    return comment;
  }
  async addCommentIn(dto: AddCommentToCommentDto, token: string): Promise<CommentIn> {
    const { username } = await this.jwtService.verify(token);

    const [comment, commentIn] = await Promise.all([
      this.commentModel.findById(dto.commentId),
      this.commentInModel.create({ ...dto, username: username })
    ]);

    comment.comment.push(commentIn);
    await Promise.all([comment.save(), commentIn.save()]);

    return commentIn;
  }



  async getOne(id: ObjectId): Promise<Trend> {
    const trend = await this.trendModel
        .findById(id)
        .populate({
          path: 'comment',
          options: { sort: { CommentLikes: -1 } }, // Додайте сортування за спаданням CommentLikes
          populate: {
            path: 'comment',
            options: { sort: { CommentLikes: -1 } }, // Сортування коментарів у коментарях
          },
        })
        .exec();

    trend.likesCount = trend.likes.length;
    trend.clicks++;
    await trend.save();

    return trend;
  }


    async getOneAndPopulateLikes(id: ObjectId){
      const trend = await this.trendModel.findById(id).populate('likes')
      return trend.likes
    }

  async toggleLike(trendId: string, token: string): Promise<boolean> {
    const { username } = await this.jwtService.verify(token);
    const like = {
      username: username,
      toTrend: trendId
    };


    const existingLike = await this.likeModel.findOne(like);

    if (existingLike) {
      // Якщо лайк вже існує, видаліть його з `likeModel` і з масиву `likes` у відповідному `Trend`
      await this.likeModel.deleteOne(like);
      await this.trendModel.findByIdAndUpdate(trendId, {
        $pull: { likes: existingLike._id }
      });
      return false;
    } else {
      // Якщо лайк не існує, створіть його у `likeModel` і додайте до масиву `likes` у відповідному `Trend`
      const newLike = await this.likeModel.create(like);
      await newLike.save();

      await this.trendModel.findByIdAndUpdate(trendId, {
        $push: { likes: newLike._id}
      });
      return true;
    }
  }


  async addLikeToComment(commentId: string, token: string): Promise<boolean> {
    const { username } = await this.jwtService.verify(token);
    const commentLike = {
      username: username,
      toComment: commentId,
    };
    const existingLike = await this.commentLikeModel.findOne(commentLike);


    if (existingLike) {
      await this.commentLikeModel.deleteOne(commentLike);
      await this.commentModel.findByIdAndUpdate(commentId, {
        $inc: { CommentLikes: -1 },
      });
      return false;
    } else {
      const newLike = await this.commentLikeModel.create(commentLike);
      await newLike.save();


      await this.commentModel.findByIdAndUpdate(commentId, {
        $inc: { CommentLikes: +1 },
      });
      return true;
    }
  }

}




