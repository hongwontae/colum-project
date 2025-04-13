import { IsEmail, IsOptional, IsString, Min, MinLength } from 'class-validator'

export class CreateUserDto {

    @IsString({message : '문자열만 받습니다.'})
    @IsEmail({}, {message : '이메일 형태를 갖춰주세요'})
    email : string;

    @IsString({message : '문자열만 받습니다.'})
    @MinLength(10, {message : '비밀번호는 최소 10자 이상이어야 합니다.'})
    password : string;

    @IsString()
    @IsOptional()
    admin : string = "user";
}