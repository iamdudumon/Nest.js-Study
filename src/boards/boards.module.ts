import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Board } from './entities/board.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { PostgresBoardRepository } from './repository/boards.repository.postgres';
import { UsersModule } from 'src/users/users.module';

import { BOARD_REPO } from 'src/common/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), forwardRef(() => UsersModule)],
  controllers: [BoardsController],
  providers: [
    BoardsService,
    {
      provide: BOARD_REPO,
      useClass: PostgresBoardRepository,
    },
  ],
  exports: [BOARD_REPO],
})
export class BoardsModule {}
