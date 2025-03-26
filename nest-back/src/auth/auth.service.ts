import { Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { AuthLoginType } from './auth-type/AuthLoginType';
import { PayloadType } from './auth-type/PayloadType';

@Injectable()
export class AuthService {

    constructor(private jwtService : JwtService){}

    async login(user : AuthLoginType){
        const payload = {sub : user._id, role : user.admin};

        return {
            accessToken : this.jwtService.sign(payload)
        }
    }

    async validateUser(payload : PayloadType){
        return {id : payload.sub, role : payload.role}
    }
}
