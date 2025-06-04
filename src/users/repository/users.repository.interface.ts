import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface UserRepository {
  save(dto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | undefined>;
  update(id: number, dto: UpdateUserDto): Promise<User | undefined>;
  remove(id: number): Promise<boolean>;
}
