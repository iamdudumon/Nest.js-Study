import { Board } from '../entities/board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

export interface BoardRepository {
  save(dto: CreateBoardDto): Promise<Board>;
  findAll(): Promise<Board[]>;
  findById(id: number): Promise<Board | undefined>;
  findByAuthorId(authorId: number): Promise<Board[] | undefined>;
  update(id: number, dto: UpdateBoardDto): Promise<Board | undefined>;
  remove(id: number): Promise<boolean>;
}
