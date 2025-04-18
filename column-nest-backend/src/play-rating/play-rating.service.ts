import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerEntity } from './play-rating-association-entity/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayRatingService {

    constructor(@InjectRepository(PlayerEntity) private playerRepo : Repository<PlayerEntity>){}

    async getPlayer(){
        return await this.playerRepo.find();
    }

}
