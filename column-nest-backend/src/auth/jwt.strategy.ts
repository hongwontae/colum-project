import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';
import { Request } from "express";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService : ConfigService){
        super({
            jwtFromRequest : ExtractJwt.fromExtractors([(req: Request)=>{
                if(req && req.cookies){
                    return req.cookies['jwt']
                }
                return null
            }]),
            ignoreExpiration : false,
            secretOrKey : configService.get<string>('JWT_SECRET_KEY')
        });
    }

    async validate(payload : any){
        if(!payload){
            throw new UnauthorizedException();
        }
        const user = {email : payload.email, role : payload.admin, userId : payload.userId}
        return user
    }

}
