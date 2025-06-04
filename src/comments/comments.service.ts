import { Injectable, Inject } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './repository/comments.repoistory.interface';
import { BoardRepository } from 'src/boards/repository/boards.repository.interface';

import { NotFoundException } from '@nestjs/common';

import { BOARD_REPO, COMMENT_REPO } from 'src/common/constants';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(COMMENT_REPO)
    private readonly commentRepo: CommentRepository,

    @Inject(BOARD_REPO) private readonly boardRepo: BoardRepository,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const board = await this.boardRepo.findById(createCommentDto.boardId);
    if (!board) throw new NotFoundException('존재하지 않는 게시글입니다.');
    // Todo: authorId check

    return this.commentRepo.save(createCommentDto);
  }

  async findByBoardId(boardId: number) {
    const comments = await this.commentRepo.findByBoardId(boardId);

    return comments;
  }

  async removeByBoardId(boardId: number) {
    const ok = await this.commentRepo.removeByBoardId(boardId);
    if (!ok)
      throw new NotFoundException(
        `게시글 ${boardId}번의 댓글을 찾을 수 없습니다.`,
      );
  }
}
