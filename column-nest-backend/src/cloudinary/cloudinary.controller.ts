import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {

    constructor(private cloudinaryService : CloudinaryService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadTest(@UploadedFile() file : Express.Multer.File){
        console.log(file);
        return this.cloudinaryService.uploadImage(file);
    }
    
}
