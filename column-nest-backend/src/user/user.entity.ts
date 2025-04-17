import { PlayRatingReportEntity } from '../play-rating/play-rating-association-entity/play-rating-report.entity';
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

    @OneToMany(()=>PlayRatingReportEntity, ({play_rating_report_id})=>play_rating_report_id)
    play_ratings : PlayRatingReportEntity[];
}