import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreatePlayResultDto {

    @IsString()
    title : string

    @IsString()
    play_description : string;

    @IsString()
    match_team : string;

    @IsNumber()
    @Type(()=>Number)
    my_score : number;

    @IsNumber()
    @Type(()=>Number)
    op_score : number;

    @IsDate()
    @Type(()=>Date)
    date : Date;

}