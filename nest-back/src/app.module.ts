import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user/user.entity";
import { UserModule } from "./user/user.module";
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';


@Module({
    imports : [
        ConfigModule.forRoot({
            isGlobal : true,
            envFilePath : `.env.${process.env.NODE_ENV}`
        }),
        TypeOrmModule.forRoot({
            type : 'mongodb',
            url : 'mongodb://localhost:27017/columnLiverpool',
            entities : [UserEntity],
            synchronize : true,
            useUnifiedTopology : true
        }),
        UserModule,
        AuthModule
    ],
    controllers : [AppController],
    providers : [AppService]
})
export class AppModule {
    constructor(private configService : ConfigService){
        const secretKey = this.configService.get<string>('SECRET_KEY');
        const expireTime = this.configService.get<string>('EXPIRE_H');
        
        // JSON.stringify로 객체나 배열을 로그에 찍기
        console.log('ConfigService values:', JSON.stringify({ secretKey, expireTime }));
    }
}
