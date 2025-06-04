import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  boardId: number;

  @Column()
  authorId: number;

  @Column()
  content: string;

  @Column()
  rating: number;

  @CreateDateColumn()
  createdAt: Date;
}
