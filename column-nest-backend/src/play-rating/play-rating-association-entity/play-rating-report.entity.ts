import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlayRatingEntity } from './play-rating.entity';

@Entity()
export class PlayRatingReportEntity {
  @PrimaryGeneratedColumn()
  play_rating_report_id: number;

  // 관계 설정-1
  // 여러 게시물은 하나의 유저에 매핑된다. manytoone
  @ManyToOne(() => UserEntity, ({ userId }) => userId, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: number;

  // 관계 설정-2
  // 하나의 report는 여러 평점을 가지고 있다.
  @OneToMany(() => PlayRatingEntity, ({ rating_id }) => rating_id)
  play_ratings: PlayRatingEntity[];

  @Column()
  play_rating_report_title: string;

  @Column()
  play_rating_report_description: string;

  @Column()
  play_rating_report_date: Date;

  @Column()
  play_rating_report_op_team: string;

  // 관계 설정 없어도 됨 => thumnail 하나만 존재할것
  @Column({ nullable: true })
  image_secure_url: string;

  @Column({ nullable: true })
  image_public_id: string;

  @Column({ nullable: true })
  image_filename: string;
}
