import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MemoryUserRepository } from './users.repository.memory';
import { BoardsModule } from 'src/boards/boards.module';

@Module({
  imports: [BoardsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: MemoryUserRepository,
    },
  ],
  exports: ['UserRepository'],
})
export class UsersModule {}
