import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PlayResultEntity {

    @PrimaryGeneratedColumn()
    play_result_id : number;

    @Column()
    image_secure_url : string;

    @Column()
    image_public_id : string;

    @Column()
    image_filename : string;

    @Column()
    title : string

    @Column()
    play_description : string;

    @Column()
    match_team : string;

    @Column()
    my_score : number;

    @Column()
    op_score : number

    @Column()
    date : Date

    @ManyToOne(()=>UserEntity, (user)=>user.play_results, {onDelete : 'CASCADE'})
    @JoinColumn({name : 'userId'})
    user : UserEntity;

    @Column()
    userId : number
}