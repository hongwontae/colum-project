import { BadRequestException, Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user-dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './user.entity';

declare module 'express' {
    export interface Request {
        user? : UserEntity
    }
}

@Controller('user')
export class UserController {

    constructor(private userService : UserService){}

    @Post('create')
    @UsePipes(new ValidationPipe({transform : true, exceptionFactory(errors) {
        const formattedErrors = errors.map((error)=>({
            field : error.property,
            messages : Object.values(error.constraints || {}),
        }))
        return new BadRequestException({
            statusCode : 400,
            message : 'Body Data 검증 실패',
            errors : formattedErrors
        })
    },}))
    async createUser(@Body() body : CreateUserDto){
        return await this.userService.createUser(body.admin, body.email, body.password);
    }

    @Post('login')
    @UsePipes(new ValidationPipe({transform : true, exceptionFactory(errors) {
        const formattedErrors = errors.map((error)=>{
            return {
                field : error.property,
                messages : Object.values(error.constraints || {})
            }
        })
        return new BadRequestException({
            statusCode : 400,
            message : 'Body Data 검증 실패',
            errors : formattedErrors
        })

    },}))
    async loginUser(@Body() body : LoginUserDto, @Res() res : Response){
        const [userToken, email, role] = await this.userService.loginUser(body.email, body.password)
        // 보낼 떄 jwt=jwtRealValue처럼 보냅니다.
        return res.cookie('jwt', userToken, {
            httpOnly : false,
            sameSite : 'lax',
            maxAge : 60*60*1000,
            domain : 'localhost'
        }).json({email, role})
    }

    @Post('logout')
    async logoutUser(@Res() res : Response){
        console.log('logout');
        return res.clearCookie('jwt',{
            httpOnly : false,
            sameSite : 'lax',
            maxAge : 60*60*1000,
            domain : 'localhost'
        }).json({message : '로그아웃 성공'})
    }

    @Post('reload')
    @UseGuards(AuthGuard('jwt'))
    async reload(@Req() request : Request){
        return request.user ? {data : request.user} : {data : false};
    }
}
