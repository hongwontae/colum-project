import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlayResultEntity } from "../play-result/play-result.entity";

@Entity()
export class ImageEntity {
    
    @PrimaryGeneratedColumn()
    image_id : number;

    @Column()
    image_secure_url : string;

    @Column()
    image_public_id : string;

    @Column()
    image_filename : string;

    @ManyToOne(()=>PlayResultEntity, (pr)=>pr.images, {onDelete : 'CASCADE'})
    @JoinColumn({name : 'play_result_id'})
    play_result : PlayResultEntity

    @Column()
    play_result_id : number

}