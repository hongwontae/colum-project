import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PlayRatingService } from './play-rating.service';

@Controller('play-rating')
export class PlayRatingController {

    constructor(private ratingService : PlayRatingService){}

    @Get('player')
    @UseGuards(AuthGuard('jwt'))
    async getPlayer(){
        return await this.ratingService.getPlayer();
    }

}
