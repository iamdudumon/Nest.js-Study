import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MemoryCommentRepository } from './comments.repository.memory';
import { BoardsModule } from 'src/boards/boards.module';

@Module({
  imports: [forwardRef(() => BoardsModule)],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    {
      provide: 'CommentRepository',
      useClass: MemoryCommentRepository,
    },
  ],
  exports: ['CommentRepository'],
})
export class CommentsModule {}
