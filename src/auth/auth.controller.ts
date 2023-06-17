import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {AuthModule} from "./auth.module";
import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";

@Controller('auth')
export class AuthController {
    constructor(private ausService: AuthService,
    private userService: UserService) {}
    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.ausService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.ausService.registration(userDto)

    }

    @Post('/login')
    async getEmail(@Request() req) {
        // Отримуємо токен з запиту, наприклад, з тіла або заголовка
        const token = req.body.token;

        // Витягаємо поле email з токену
        const username = await this.ausService.getEmailFromToken(token);

        // Робимо інші дії з отриманим email

        // Повертаємо відповідь або токен
        return { username };
    }

}
