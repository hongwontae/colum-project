import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import {v2} from 'cloudinary';
import {ConfigService} from '@nestjs/config';
import { CloudinaryController } from './cloudinary.controller';

@Module({
  providers: [{
    provide : 'CLOUDINARY',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return v2.config({
        cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
        api_key: configService.get<string>('CLOUDINARY_API_KEY'),
        api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
      });
    }
  },
  CloudinaryService
],
exports : ['CLOUDINARY'],
controllers: [CloudinaryController]
})
export class CloudinaryModule {}
