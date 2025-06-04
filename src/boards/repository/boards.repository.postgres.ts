import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from '../dto/create-board.dto';
import { BoardRepository } from './boards.repository.interface';
import { UpdateBoardDto } from '../dto/update-board.dto';

@Injectable()
export class PostgresBoardRepository implements BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly repo: Repository<Board>,
  ) {}

  async save(dto: CreateBoardDto) {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  async findAll(): Promise<Board[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Board | undefined> {
    return this.repo.findOne({ where: { id } });
  }

  findByAuthorId(authorId: number): Promise<Board[] | undefined> {
    return this.repo.find({ where: { authorId: authorId } });
  }

  async update(id: number, dto: UpdateBoardDto): Promise<Board | undefined> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) return undefined;

    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
