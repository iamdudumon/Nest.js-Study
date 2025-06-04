import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentRepository } from './comments.repoistory.interface';

@Injectable()
export class PostgresCommentRepository implements CommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly repo: Repository<Comment>,
  ) {}

  async save(dto: CreateCommentDto) {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  findByBoardId(boardId: number): Promise<Comment[] | undefined> {
    return this.repo.find({ where: { boardId: boardId } });
  }

  async removeByBoardId(boardId: number): Promise<boolean> {
    const result = await this.repo.delete({ boardId });
    return result.affected !== 0;
  }
}
