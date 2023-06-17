import {ObjectId} from "mongoose";

export class AddCommentToCommentDto {


    readonly text: string;

    readonly commentId: ObjectId;


}