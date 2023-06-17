import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Comment } from "./comment.schema";
import * as mongoose from "mongoose";
import {Likes} from "./like.schema";


export type TrendDocument = Trend;

@Schema()
export class Trend {
    @Prop()
    username: string;



    @Prop()
    id: number;

    @Prop({ type: Number, default: 1 }) // Додано поле clicks зі значенням за замовчуванням 0
    clicks: number;

    @Prop()
    title: string;

    @Prop({ type: Number, default: 0 }) // Додано поле clicks зі значенням за замовчуванням 0
    likesCount: number;


    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comment: Comment[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Likes' }] })
    likes: Likes[];


}

export const TrendSchema = SchemaFactory.createForClass(Trend);
