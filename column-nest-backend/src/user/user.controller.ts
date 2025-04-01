import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService : UserService){}

    @Post('create')
    @UsePipes(new ValidationPipe({transform : true}))
    async createUser(@Body() body : CreateUserDto){
        return await this.userService.createUser(body.admin, body.email, body.password);
    }

}
