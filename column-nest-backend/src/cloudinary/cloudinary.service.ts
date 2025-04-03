import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {

    async uploadImage(file : Express.Multer.File) : Promise<UploadApiResponse>{
        return new Promise((resolve, reject)=>{
            
            const upload = cloudinary.uploader.upload_stream({folder : 'uploads'}, (error, result)=>{
               if(error || !result){
                return reject(error || new Error('Cloudinary upload failed'));
               }
               console.log('✅ Uploaded File URL:', result.secure_url);
               resolve(result);
            })

            const readableStream = new Readable();
            readableStream.push(file.buffer);
            readableStream.push(null);
            readableStream.pipe(upload);
        })
    }
    async deleteImage(publicId: string): Promise<{ result: string }> {
        return cloudinary.uploader.destroy(publicId);
      }
}
