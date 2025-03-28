import { IsBoolean, IsOptional, IsString } from "class-validator";

export class createUserDto {
    
    @IsBoolean()
    @IsOptional()
    admin : boolean = false;

    @IsString()
    email : string;

    @IsString()
    password : string
}