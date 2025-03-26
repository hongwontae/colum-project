import { IsBoolean, IsOptional, IsString } from "class-validator";

export class LoginUserDto {

    @IsBoolean()
    @IsOptional()
    admin : boolean = false;

    @IsString()
    _id : string
}