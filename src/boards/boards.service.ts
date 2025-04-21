import { Injectable, Inject } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardRepository } from './boards.repository.interface';

import { NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository.interface';

@Injectable()
export class BoardsService {
  constructor(
    @Inject('BoardRepository') private readonly boardRepo: BoardRepository,

    @Inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    const user = this.userRepo.findById(createBoardDto.authorId);
    if (!user) throw new NotFoundException('존재하지 않는 사용자입니다.');
    return this.boardRepo.create(createBoardDto);
  }

  findAll() {
    return this.boardRepo.findAll();
  }

  findOne(id: number) {
    const board = this.boardRepo.findById(id);
    if (!board) throw new NotFoundException('게시글 없음');
    return board;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    const board = this.boardRepo.update(id, updateBoardDto);
    if (!board)
      throw new NotFoundException(`게시글 ${id}번을 찾을 수 없습니다.`);
    return board;
  }

  remove(id: number) {
    const ok = this.boardRepo.remove(id);
    if (!ok) throw new NotFoundException(`게시글 ${id}번을 찾을 수 없습니다.`);
  }
}
