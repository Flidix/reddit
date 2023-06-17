import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto{
    @ApiProperty({example: 'youremail@gmail.com', description: 'email'})
    @IsString({message: "Має бути рядком"})

    readonly username: string;
    @ApiProperty({example: '123456789', description: 'password'})
    @IsString({message: "Має бути рядком"})
    @Length(4, 16, {message: 'Не менше 4 и не більше 16'})
    readonly password: string;
}