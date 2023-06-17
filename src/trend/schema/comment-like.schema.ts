import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Comment } from "./comment.schema";
import * as mongoose from "mongoose";
import {Trend} from "./trend.schema";


export type CommentLikesDocument = CommentLikes;

@Schema()
export class CommentLikes {
    @Prop()
    username: string


    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Comment'})
    toComment: Comment;


}

export const CommentLikesSchema = SchemaFactory.createForClass(CommentLikes);
