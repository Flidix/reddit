import { Module, forwardRef } from '@nestjs/common';
import { TrendService } from './trend.service';
import { TrendController } from './trend.controller';
import { Trend, TrendSchema } from './schema/trend.schema';
import { Comment, CommentSchema } from './schema/comment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../user/user.module";
import {Likes, LikesSchema} from "./schema/like.schema";
import {CommentIn, CommentInSchema} from "./schema/comment.In.schema";
import {CommentLikes, CommentLikesSchema} from "./schema/comment-like.schema";

@Module({
    controllers: [TrendController],
    providers: [TrendService],
    imports: [
        MongooseModule.forFeature([{ name: Trend.name, schema: TrendSchema }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
        MongooseModule.forFeature([{ name: Likes.name, schema: LikesSchema }]),
        MongooseModule.forFeature([{ name: CommentIn.name, schema: CommentInSchema }]),
        MongooseModule.forFeature([{ name: CommentLikes.name, schema: CommentLikesSchema }]),



        forwardRef(() => AuthModule),
        forwardRef(() => UserModule),


    ],
})
export class TrendModule {}
