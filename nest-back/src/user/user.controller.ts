import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { createUserDto } from './user-dto/create-user-dto';
import { UserService } from './user.service';
import { LoginUserDto } from './user-dto/login-user-dto';
import { AuthService } from 'src/auth/auth.service';


@Controller('user')
export class UserController {

    constructor(private userService : UserService, private authService : AuthService){}

    @Post('create')
    @UsePipes(new ValidationPipe({transform : true}))
    async createUser(@Body() body : createUserDto ){
        return await this.userService.createUser(body.admin, body.email, body.password);
    }

    @Post('login')
    @UsePipes(new ValidationPipe({transform : true}))
    async loginUser(@Body () body : LoginUserDto){
        return this.authService.login({_id : body._id, admin : body.admin})
    }


}
