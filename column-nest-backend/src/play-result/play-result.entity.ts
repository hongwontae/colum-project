import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ImageEntity } from "../cloudinary/image-entity";


@Entity()
export class PlayResultEntity {

    @PrimaryGeneratedColumn()
    play_result_id : number;

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

    @OneToMany(()=>ImageEntity, (image)=>image.play_result)
    images : ImageEntity[];
}