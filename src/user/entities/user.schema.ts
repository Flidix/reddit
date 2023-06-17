import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from "mongoose";
import {IsEmail} from "sequelize-typescript";
import {Trend} from "../../trend/schema/trend.schema";


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    id: string;
    @Prop({ unique: true }) // Додано обмеження унікальності
    username: string

    @Prop()
    password: string

    @Prop()
    trends: Trend[]
}
export const UserSchema = SchemaFactory.createForClass(User);