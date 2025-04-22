import { forwardRef, Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { MemoryBoardRepository } from './boards.repository.memory';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [BoardsController],
  providers: [
    BoardsService,
    {
      provide: 'BoardRepository', // 토큰 등록
      useClass: MemoryBoardRepository, // 실제 구현체
    },
  ],
  exports: ['BoardRepository'],
})
export class BoardsModule {}
