import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Trend} from "./trend.schema";
import * as mongoose from "mongoose";
import {CommentIn} from "./comment.In.schema";


export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
    @Prop()
    username: string;

    @Prop()
    text: string;

    @Prop({ type: Number, default: 0 }) // Додано поле clicks зі значенням за замовчуванням 0
    CommentLikes: number

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentIn' }] })
    comment: CommentIn[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Trend' })
    trend: Trend;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);