import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface UserRepository {
  save(dto: CreateUserDto): User;
  findAll(): User[];
  findById(id: number): User | undefined;
  update(id: number, dto: UpdateUserDto): User | undefined;
  remove(id: number): boolean;
}
