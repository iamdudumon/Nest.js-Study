import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './entities/comment.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostgresCommentRepository } from './repository/comments.repository.postgres';
import { BoardsModule } from 'src/boards/boards.module';

import { COMMENT_REPO } from 'src/common/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => BoardsModule),
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    {
      provide: COMMENT_REPO,
      useClass: PostgresCommentRepository,
    },
  ],
  exports: [COMMENT_REPO],
})
export class CommentsModule {}
