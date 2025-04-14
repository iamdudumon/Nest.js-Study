import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.findAll();
  }

  findOne(id: number) {
    const user: User = this.userRepo.findById(id);
    if (!user)
      throw new NotFoundException(`사용자 ${id}번을 찾을 수 없습니다.`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = this.userRepo.update(id, updateUserDto);
    if (!user)
      throw new NotFoundException(`사용자 ${id}번을 찾을 수 없습니다.`);
    return user;
  }

  remove(id: number) {
    const ok = this.userRepo.remove(id);
    if (!ok) throw new NotFoundException(`사용자 ${id}번을 찾을 수 없습니다.`);
  }
}
