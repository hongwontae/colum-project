import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private jwtService : JwtService){}

    loginUser(userId : number, email : string){
        return this.jwtService.sign({userId, sub : email})
        
    }

}
