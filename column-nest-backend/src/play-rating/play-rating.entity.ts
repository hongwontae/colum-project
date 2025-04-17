import { UserEntity } from 'src/user/user.entity';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class PlayRatingEntity {

    @PrimaryGeneratedColumn()
    play_rating_id : number;

    // 관계 설정
    // 여러 게시물은 하나의 유저에 매핑된다. manytoone
    @ManyToOne(()=>UserEntity, ({userId})=>userId, {onDelete : 'CASCADE'})
    @JoinColumn({name : 'userId'})
    user : UserEntity;

    @Column()
    userId : number;

}