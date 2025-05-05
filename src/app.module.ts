import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { CommentsModule } from './comments/comments.module';
import { LoggerModule } from './common/logger/loger.module';

@Module({
  imports: [UsersModule, BoardsModule, CommentsModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
