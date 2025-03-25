import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo : MongoRepository<User>){}

    async createUser(admin : boolean, email : string, password : string){
        const user =  this.repo.create({admin, email, password});
        return await this.repo.save(user);
    }
}
