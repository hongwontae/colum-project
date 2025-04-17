import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}