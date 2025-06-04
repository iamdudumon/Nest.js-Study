import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: '게시글에 댓글 작성',
  })
  @ApiResponse({ status: 201, description: '댓글 작성 성공' })
  @ApiBody({ type: CreateCommentDto })
  async create(@Body() createCommentDto: CreateCommentDto) {
    const comment = await this.commentsService.create(createCommentDto);

    return {
      message: '댓글 생성에 성공했습니다.',
      statusCode: 201,
      data: {
        comment: comment,
      },
    };
  }

  @Get(':boardId')
  @HttpCode(200)
  @ApiOperation({
    summary: '특정 게시글의 댓글 조회',
  })
  @ApiResponse({ status: 200, description: '댓글 조회 성공' })
  async findByAuthorId(@Param('boardId') boardId: number) {
    const comments = await this.commentsService.findByBoardId(boardId);

    return {
      message: '게시글 댓글 조회에 성공했습니다.',
      statusCode: 200,
      data: {
        comments: comments,
      },
    };
  }

  @Delete(':boardId')
  @HttpCode(204)
  @ApiOperation({
    summary: '특정 게시글의 댓글 삭제',
  })
  @ApiResponse({ status: 204, description: '삭제 성공' })
  async removeByAuthorId(@Param('boardId') boardId: number) {
    await this.commentsService.removeByBoardId(+boardId);
  }
}
