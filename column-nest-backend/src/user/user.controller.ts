import { Body, Controller, Get, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user-dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

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
        console.log(body)
        const userToken = await this.userService.loginUser(body.email, body.password, body.userId)
        return res.cookie('jwt', userToken, {
            httpOnly : true,
            sameSite : 'lax',
            maxAge : 60*60*1000
        }).json({message : 'login-Success'})
    }

    @Get('resource')
    @UseGuards(AuthGuard('jwt'))
    async testProtect(){
        console.log('hello-world')
        return {resource : "Success Resource Access"}
    }
}
