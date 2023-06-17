import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Trend} from "./trend.schema";
import * as mongoose from "mongoose";
import {Comment} from "./comment.schema";


export type CommentInDocument = HydratedDocument<CommentIn>;

@Schema()
export class CommentIn {
    @Prop()
    username: string;

    @Prop()
    text: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
    commentId: Comment;


}
export const CommentInSchema = SchemaFactory.createForClass(CommentIn);