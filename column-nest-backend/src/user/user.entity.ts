import { PlayResultEntity } from 'src/play-result/play-result.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

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

    @OneToMany(()=>PlayResultEntity, (playResult)=> playResult.user)
    play_results : PlayResultEntity[];
}