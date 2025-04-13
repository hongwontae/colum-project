import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayResultEntity } from './play-result.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePlayResultDto } from './dto/create-play-resul.dto';

@Injectable()
export class PlayResultService {
  constructor(
    @InjectRepository(PlayResultEntity)
    private repo: Repository<PlayResultEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createPlayResult(
    file: Express.Multer.File,
    body: CreatePlayResultDto,
    userId: number,
  ) {
    const postData = this.repo.create({
        title : body.title,
        date : body.date,
        match_team : body.match_team,
        my_score : body.my_score,
        op_score : body.op_score,
        play_description : body.play_description,
        userId : userId,
    })

    const upload_metadata = await  this.cloudinaryService.uploadImage(file);

    return await this.repo.save(postData);
  }

  async allgetResult(page : number){
    console.log(page);
    const currentPage = page;
    const limit = 10;

    const [data, total] = await this.repo.findAndCount({
      skip : (currentPage-1) * limit,
      take : limit,
      order : {play_result_id : 'DESC'}
    })

    return {
      data,
      total,
      currentPage,
      lastPage : Math.ceil(total/limit)
    }

  }

  async oneGetResult(id : number){
    const matchData = await this.repo.findOne({where : {play_result_id : id}});

    if(!matchData){
      throw new NotFoundException();
    }
    
    return matchData;

  }

}
