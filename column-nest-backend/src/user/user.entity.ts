import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    userId : number;

    @Column()
    email : string;

    @Column()
    password : string;

    @Column()
    admin : string;
}