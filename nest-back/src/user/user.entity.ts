import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn()
    _id : string

    @Column()
    admin : boolean;

    @Column()
    email : string;

    @Column()
    password : string;

}