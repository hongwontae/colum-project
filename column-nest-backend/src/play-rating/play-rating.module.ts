import { Module } from '@nestjs/common';
import { PlayRatingController } from './play-rating.controller';
import { PlayRatingService } from './play-rating.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayRatingReportEntity } from './play-rating-association-entity/play-rating-report.entity';
import { PlayRatingEntity } from './play-rating-association-entity/play-rating.entity';
import { PlayerEntity } from './play-rating-association-entity/player.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlayRatingReportEntity,
      PlayRatingEntity,
      PlayerEntity,
    ]),
    CloudinaryModule,
  ],
  controllers: [PlayRatingController],
  providers: [PlayRatingService],
  exports: [PlayRatingService],
})
export class PlayRatingModule {}
