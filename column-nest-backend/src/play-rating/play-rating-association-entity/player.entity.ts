import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlayRatingEntity } from "./play-rating.entity";

@Entity()
export class PlayerEntity {

    @PrimaryGeneratedColumn()
    player_id : number;

    @Column()
    player_name : string;

    @Column()
    position : string;

    @Column()
    backNumber : number;

    @Column()
    start_bol : boolean;

    @OneToMany(()=>PlayRatingEntity, ({rating_id})=>rating_id)
    play_ratings : PlayRatingEntity[];
}