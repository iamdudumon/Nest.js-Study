import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
// import { UpdateCommentDto } from './dto/update-comment.dto';

export interface CommentRepository {
  save(dto: CreateCommentDto): Promise<Comment>;
  findByBoardId(boardId: number): Promise<Comment[] | undefined>;
  removeByBoardId(boardId: number): Promise<boolean>;
  //   update(id: number, dto: UpdateCommentDto): Comment | undefined;
  //   remove(id: number): boolean;
}
