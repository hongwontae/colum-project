import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { PlayResultModule } from './play-result/play-result.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PlayResultEntity } from './play-result/play-result.entity';
import { ImageEntity } from './cloudinary/image-entity';
import { PlayRatingModule } from './play-rating/play-rating.module';
import { PlayRatingEntity } from './play-rating/play-rating.entity';

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
      entities : [UserEntity, PlayResultEntity, ImageEntity, PlayRatingEntity],
      synchronize : true,
    }),
    TypeOrmModule.forFeature([UserEntity, PlayResultEntity, ImageEntity, PlayRatingEntity]),
    UserModule,
    AuthModule,
    PlayResultModule,
    CloudinaryModule,
    PlayRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
