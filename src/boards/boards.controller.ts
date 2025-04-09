import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @ApiOperation({
    summary: '게시글 작성',
    description: '새 게시글을 작성합니다.',
  })
  @ApiResponse({ status: 201, description: '작성 성공' })
  @ApiBody({ type: CreateBoardDto })
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  @ApiOperation({
    summary: '모든 게시글 조회',
    description: '모든 게시글 리스트를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 게시글 조회',
    description: '게시글 번호와 일치하는 게시글을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '특정 게시글 수정',
    description: '게시글 번호와 일치하는 게시글의 정보를 수정합니다.',
  })
  @ApiResponse({ status: 200, description: '수정 성공' })
  @ApiBody({ type: UpdateBoardDto })
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 게시글 삭제',
    description: '게시글 번호와 일치하는 게시글을 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '삭제 성공' })
  remove(@Param('id') id: string) {
    return this.boardsService.remove(+id);
  }
}
