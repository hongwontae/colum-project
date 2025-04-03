import { Module } from '@nestjs/common';
import { PlayResultService } from './play-result.service';
import { PlayResultController } from './play-result.controller';

@Module({
  providers: [PlayResultService],
  controllers: [PlayResultController]
})
export class PlayResultModule {}
