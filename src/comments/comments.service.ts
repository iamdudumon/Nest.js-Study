import { Injectable, Inject } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './comments.repoistory.interface';
import { BoardRepository } from 'src/boards/repository/boards.repository.interface';

import { NotFoundException } from '@nestjs/common';

import { BOARD_REPO } from 'src/common/constants';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('CommentRepository')
    private readonly commentRepo: CommentRepository,

    @Inject(BOARD_REPO) private readonly boardRepo: BoardRepository,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const board = this.boardRepo.findById(createCommentDto.boardId);
    if (!board) throw new NotFoundException('존재하지 않는 게시글입니다.');
    return this.commentRepo.save(createCommentDto);
  }

  findByBoardId(boardId: number) {
    const comments = this.commentRepo.findByBoardId(boardId);
    return comments;
  }

  removeByBoardId(boardId: number) {
    const ok = this.commentRepo.removeByBoardId(boardId);
    if (!ok)
      throw new NotFoundException(
        `게시글 ${boardId}번의 댓글을 찾을 수 없습니다.`,
      );
  }
}
