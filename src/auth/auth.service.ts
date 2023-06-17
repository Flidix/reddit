import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {User} from "../user/entities/user.schema";
import * as bcrypt from "bcryptjs"


@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService) {}

    async login( userDto: CreateUserDto){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }


    async registration( userDto: CreateUserDto){
        const candidate = await this.userService.getUsersByEmail(userDto.username)
        if (candidate){
            throw new HttpException('Користувач з таким email існує', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    async generateToken(user: User){
        const payload = {username: user.username, id: user.id}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUsersByEmail(userDto.username)
        const passwordEquals = await  bcrypt.compare(userDto.password, user.password)
        if(user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({message:'неправельний пароль або email'})

    }
    async getEmailFromToken(token: string): Promise<string> {
        const decodedToken = this.jwtService.verify(token);
        return decodedToken.username;
    }


}