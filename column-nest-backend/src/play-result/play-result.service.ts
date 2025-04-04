import { Injectable } from '@nestjs/common';
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
    console.log(file)
    console.log(body)
    console.log(userId)
    const upload_metadata = await  this.cloudinaryService.uploadImage(file);
    const postData = this.repo.create({
        title : body.title,
        image_secure_url : upload_metadata.secure_url,
        image_public_id : upload_metadata.public_id,
        image_filename : upload_metadata.original_filename,
        date : body.date,
        match_team : body.match_team,
        my_score : body.my_score,
        op_score : body.op_score,
        play_description : body.play_description,
        userId : userId,
        
    })
    return await this.repo.save(postData);
  }
}
