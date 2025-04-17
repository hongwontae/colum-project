import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlayRatingReportEntity } from "./play-rating-report.entity";
import { PlayerEntity } from "./player.entity";

@Entity()
export class PlayRatingEntity {

    @PrimaryGeneratedColumn()
    rating_id : number;

    @ManyToOne(()=>PlayRatingReportEntity, ({play_rating_report_id})=>play_rating_report_id, {onDelete : 'CASCADE'})
    @JoinColumn({name : 'play_rating_report_id'})
    play_rating_report : PlayRatingReportEntity;

    @Column()
    play_rating_report_id : number;

    @ManyToOne(()=>PlayerEntity, ({player_id})=>player_id, {onDelete : 'CASCADE'})
    @JoinColumn({name : 'player_id'})
    player : PlayerEntity

    @Column()
    player_id : number

    @Column()
    rating : number;


    
}