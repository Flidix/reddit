import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Comment } from "./comment.schema";
import * as mongoose from "mongoose";
import {Trend} from "./trend.schema";


export type LikesDocument = Likes;

@Schema()
export class Likes {
    @Prop()
    username: string


    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Track'})
    toTrend: Trend;


}

export const LikesSchema = SchemaFactory.createForClass(Likes);
