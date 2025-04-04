import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
    @UsePipes(new ValidationPipe({transform : true}))
    async createUser(@Body() body : CreateUserDto){
        return await this.userService.createUser(body.admin, body.email, body.password);
    }

    @Post('login')
    @UsePipes(new ValidationPipe({transform : true}))
    async loginUser(@Body() body : LoginUserDto, @Res() res : Response){
        const userToken = await this.userService.loginUser(body.email, body.password)
        // 보낼 떄 jwt=jwtRealValue처럼 보냅니다.
        return res.cookie('jwt', userToken, {
            httpOnly : false,
            sameSite : 'lax',
            maxAge : 60*60*1000,
            domain : 'localhost'
        }).json({message : 'login-Success'})
    }

    @Get('resource')
    @UseGuards(AuthGuard('jwt'))
    async testProtect(@Req() request : Request){
        console.log('hello-world')
        console.log(request.user)
        return {resource : "Success Resource Access"}
    }
}
