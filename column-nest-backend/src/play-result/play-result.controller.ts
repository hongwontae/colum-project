import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePlayResultDto } from './dto/create-play-resul.dto';
import { Request } from 'express';
import { PlayResultService } from './play-result.service';
import { UserEntity } from 'src/user/user.entity';

declare module 'express' {
    export interface Request {
        user? : UserEntity
    }
}

@Controller('play-result')
export class PlayResultController {

    constructor(private playResultService : PlayResultService){}

  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({transform : true}))
  async postResult(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePlayResultDto,
    @Req() request: Request,
  ) {
    const postData = await this.playResultService.createPlayResult(file, body, Number(request.user?.userId));
    console.log(postData);
    return postData;
  }
}
