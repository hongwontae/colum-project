import { IsBoolean, IsOptional, IsString } from "class-validator";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class UserEntity {

    @ObjectIdColumn()
    _id : string;

    @Column()
    admin : boolean = false;

    @Column()
    email : string;

    @Column()
    password : string
}