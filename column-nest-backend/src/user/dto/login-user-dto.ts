import { IsNumber, IsString } from "class-validator";

export class LoginUserDto {

    @IsNumber()
    userId : number

    @IsString()
    email : string

    @IsString()
    password : string
}