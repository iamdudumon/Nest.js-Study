// import { Injectable } from '@nestjs/common';
// import { User } from '../entities/user.entity';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { UpdateUserDto } from 'src/users/dto/update-user.dto';
// import { UserRepository } from './users.repository.interface';

// @Injectable()
// export class MemoryUserRepository implements UserRepository {
//   private users: User[] = [];
//   private id = 1;

//   save(createDto: CreateUserDto): User {
//     const user = {
//       id: this.id++,
//       ...createDto,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     this.users.push(user);
//     return user;
//   }

//   findById(id: number): User | undefined {
//     return this.users.find((u) => u.id === id);
//   }

//   findAll(): User[] {
//     return this.users;
//   }

//   update(id: number, updateDto: UpdateUserDto) {
//     const user: User = this.findById(id);
//     if (!user) return undefined;
//     Object.assign(user, updateDto);
//     return user;
//   }

//   remove(id: number): boolean {
//     const before = this.users.length;
//     this.users = this.users.filter((b) => b.id !== id);
//     return this.users.length < before;
//   }
// }
