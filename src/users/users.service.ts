import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: Array<User> = [];
  private id = 0;

  create(createUserDto: CreateUserDto) {
    this.users.push({
      id: ++this.id,
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user: User = this.users.find((user) => user.id == id);

    if (!user) throw new NotFoundException();
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = this.findOne(id);

    this.remove(id);
    this.users.push({
      ...user,
      ...updateUserDto,
      updatedAt: new Date(),
    });
  }

  remove(id: number) {
    const idx: number = this.users.findIndex((user) => user.id == id);

    this.users.splice(idx, 1);
  }
}
