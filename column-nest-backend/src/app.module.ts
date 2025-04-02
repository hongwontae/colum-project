import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath : `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      password: 'YourRootPassword',
      username: 'root',
      database: 'col-liver',
      entities : [UserEntity],
      synchronize : true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
