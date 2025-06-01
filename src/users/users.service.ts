import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/users.repository.interface';
import { BoardRepository } from 'src/boards/boards.repository.interface';

import { USER_REPO } from '../common/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPO) private readonly userRepo: UserRepository,

    @Inject('BoardRepository') private readonly boardRepo: BoardRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      await this.userRepo.save(createUserDto);
    } catch (err) {
      // Todo: 예외 처리
      throw err;
    }
  }

  findAll() {
    return this.userRepo.findAll();
  }

  async findOne(id: number) {
    const user: User = await this.userRepo.findById(id);
    if (!user)
      throw new NotFoundException(`사용자 ${id}번을 찾을 수 없습니다.`);

    return user;
  }

  async findBoardsByAuthorId(id: number) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('사용자 없음');

    return this.boardRepo.findByAuthorId(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = await this.userRepo.update(id, updateUserDto);
    if (!user)
      throw new NotFoundException(`사용자 ${id}번을 찾을 수 없습니다.`);

    return user;
  }

  async remove(id: number) {
    const ok = await this.userRepo.remove(id);
    if (!ok) throw new NotFoundException(`사용자 ${id}번을 찾을 수 없습니다.`);

    return true;
  }
}
