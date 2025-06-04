import { Injectable, Inject } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardRepository } from './repository/boards.repository.interface';

import { NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/users/repository/users.repository.interface';

import { USER_REPO, BOARD_REPO } from '../common/constants';

@Injectable()
export class BoardsService {
  constructor(
    @Inject(BOARD_REPO) private readonly boardRepo: BoardRepository,

    @Inject(USER_REPO) private readonly userRepo: UserRepository,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const user = await this.userRepo.findById(createBoardDto.authorId);
    if (!user) throw new NotFoundException('존재하지 않는 사용자입니다.');

    return await this.boardRepo.save(createBoardDto);
  }

  findAll() {
    return this.boardRepo.findAll();
  }

  async findOne(id: number) {
    const board = await this.boardRepo.findById(id);
    if (!board) throw new NotFoundException('게시글 없음');

    return board;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepo.update(id, updateBoardDto);
    if (!board)
      throw new NotFoundException(`게시글 ${id}번을 찾을 수 없습니다.`);

    return board;
  }

  async remove(id: number) {
    const ok = await this.boardRepo.remove(id);
    if (!ok) throw new NotFoundException(`게시글 ${id}번을 찾을 수 없습니다.`);
  }
}
