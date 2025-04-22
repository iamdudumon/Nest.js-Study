import { Injectable } from '@nestjs/common';
import { BoardRepository } from './boards.repository.interface';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class MemoryBoardRepository implements BoardRepository {
  private boards: Board[] = [];
  private id = 1;

  create(createDto: CreateBoardDto): Board {
    const newBoard: Board = {
      id: this.id++,
      ...createDto,
    };
    this.boards.push(newBoard);
    return newBoard;
  }

  findAll(): Board[] {
    return this.boards;
  }

  findById(id: number): Board | undefined {
    return this.boards.find((b) => b.id === id);
  }

  findByAuthorId(authorId: number): Board | undefined {
    return this.boards.find((b) => b.authorId === authorId);
  }

  update(id: number, updateDto: UpdateBoardDto): Board | undefined {
    const board = this.findById(id);
    if (!board) return undefined;
    Object.assign(board, updateDto);
    return board;
  }

  remove(id: number): boolean {
    const before = this.boards.length;
    this.boards = this.boards.filter((b) => b.id !== id);
    return this.boards.length < before;
  }
}
