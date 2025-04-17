import { Module } from '@nestjs/common';
import { PlayRatingController } from './play-rating.controller';
import { PlayRatingService } from './play-rating.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayRatingEntity } from './play-rating.entity';

@Module({
  imports : [TypeOrmModule.forFeature([PlayRatingEntity])],
  controllers: [PlayRatingController],
  providers: [PlayRatingService],
  exports : [PlayRatingService]
})
export class PlayRatingModule {}
