import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private jwtService : JwtService){}

    loginUser( email : string, admin : string, userId : number){
        return this.jwtService.sign({email, admin, userId})        
    }

}
