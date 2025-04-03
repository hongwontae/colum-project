import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {

    @IsString()
    email : string;

    @IsString()
    password : string;

    @IsString()
    @IsOptional()
    admin : string = "user";
}