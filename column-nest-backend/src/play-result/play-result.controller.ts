import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
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
    console.log(request.user?.userId)
    const postData = await this.playResultService.createPlayResult(file, body, Number(request.user?.userId));
    return postData;
  }

  @Get('total/pr')
  async allGetResult(@Query('current') page : string){  
    console.log('???')
      return this.playResultService.allgetResult(Number(page));
  }

  @Get('one/pr/:id')
  async oneGetResult(@Param() ID : {id : string}){
    console.log('access-oneGetResult Controller');
    const id = ID.id;
    console.log(id);
    return this.playResultService.oneGetResult(Number(id));
  }


  @Post('auth/pr')
  @UseGuards(AuthGuard('jwt'))
  async authPlayResult(@Req() req : Request){
    if(req.user){
      return {message : 'form에 대한 접근이 가능한 사용자입니다.'}
    } else {
      throw new UnauthorizedException()
    }
  }


}
