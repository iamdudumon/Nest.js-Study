import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];
  private id: number = 1;

  create(createBoardDto: CreateBoardDto) {
    const newBoard = {
      id: this.id++,
      ...createBoardDto,
    };
    this.boards.push(newBoard);
    return '201';
  }

  findAll() {
    return this.boards;
  }

  findOne(id: number) {
    const board = this.boards.find((b) => b.id == id);
    if (!board)
      throw new NotFoundException(`게시글 ${id}번을 찾을 수 없습니다.`);

    return board;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    const board = this.boards.find((b) => b.id == id);
    if (!board)
      throw new NotFoundException(`게시글 ${id}번을 찾을 수 없습니다.`);

    board.title = updateBoardDto.title ?? board.title;
    board.content = updateBoardDto.content ?? board.content;
    return '200';
  }

  remove(id: number) {
    this.boards = this.boards.filter((b) => b.id !== id);

    return '200';
  }
}
