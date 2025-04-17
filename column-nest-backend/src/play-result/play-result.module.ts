import { Module } from '@nestjs/common';
import { PlayResultService } from './play-result.service';
import { PlayResultController } from './play-result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayResultEntity } from './play-result.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [TypeOrmModule.forFeature([PlayResultEntity]), CloudinaryModule, AuthModule],
  providers: [PlayResultService],
  controllers: [PlayResultController],
  exports : [PlayResultService]
})
export class PlayResultModule {}
