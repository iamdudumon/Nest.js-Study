import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({
    summary: '게시글에 댓글 작성',
  })
  @ApiResponse({ status: 201, description: '댓글 작성 성공' })
  @ApiBody({ type: CreateCommentDto })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get(':boardId')
  @ApiOperation({
    summary: '특정 게시글의 댓글 조회',
  })
  @ApiResponse({ status: 200, description: '댓글 조회 성공' })
  findByAuthorId(@Param('boardId') boardId: string) {
    return this.commentsService.findByBoardId(+boardId);
  }

  @Delete(':boardId')
  @ApiOperation({
    summary: '특정 게시글의 댓글 삭제',
  })
  @ApiResponse({ status: 200, description: '삭제 성공' })
  removeByAuthorId(@Param('boardId') boardId: string) {
    return this.commentsService.removeByBoardId(+boardId);
  }
}
