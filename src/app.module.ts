import {forwardRef, Module} from '@nestjs/common';

import { TrendModule } from './trend/trend.module';
import {MongooseModule} from "@nestjs/mongoose";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb+srv://ADMIN:password@cluster0.e3t0bgf.mongodb.net/?retryWrites=true&w=majority'),
      forwardRef(() => TrendModule),
      UserModule,
      AuthModule,
      ],

})
export class AppModule {}
