import { IsEmail, IsNumber, IsString, Length, MinLength } from "class-validator";

export class LoginUserDto {

    @IsString({message : '문자열만 받습니다.'})
    @IsEmail({}, {message : '올바른 이메일 형태를 갖춰주세요'})
    email : string

    @IsString({message : '문자열만 받습니다.'})
    @MinLength(10, {message : '비밀번호는 최소한 10자가 넘어야 합니다.'})
    password : string
}   