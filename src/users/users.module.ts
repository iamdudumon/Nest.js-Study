import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { PostgresUserRepository } from './repository/users.repository.postgres';

import { BoardsModule } from 'src/boards/boards.module';

import { USER_REPO } from '../common/constants';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BoardsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USER_REPO,
      useClass: PostgresUserRepository,
    },
  ],
  exports: [USER_REPO],
})
export class UsersModule {}
