import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PlayResultEntity {

    @PrimaryGeneratedColumn()
    play_result_id : number;

    @Column()
    title : string;

    @Column()
    matchTeam : string;

}