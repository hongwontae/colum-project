import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user-dto/create-user-dto';

@Controller('user')
export class UserController {

    constructor(private userService : UserService){}

    @Post('create')
    @UsePipes(new ValidationPipe({transform : true, whitelist : true}))
    async createUserRoute(@Body() body : CreateUserDto){
         const user = await this.userService.createUser(body.admin, body.email, body.password);
         return user;
    }
}
