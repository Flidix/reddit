import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";

@Module({
  imports: [
      forwardRef(() => UserModule),
      JwtModule.register({
        secret: process.env.PRIVAT_KEY || 'SECRET',
        signOptions:{
          expiresIn: '24h'
        }
      })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
