import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from './users.repository.interface';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class PostgresUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async save(dto: CreateUserDto) {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateUserDto): Promise<User | undefined> {
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
