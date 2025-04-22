import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

export interface BoardRepository {
  create(dto: CreateBoardDto): Board;
  findAll(): Board[];
  findById(id: number): Board | undefined;
  findByAuthorId(authorId: number): Board | undefined;
  update(id: number, dto: UpdateBoardDto): Board | undefined;
  remove(id: number): boolean;
}
