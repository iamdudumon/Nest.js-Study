import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
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
  @HttpCode(201)
  @ApiOperation({
    summary: '게시글 작성',
    description: '새 게시글을 작성합니다.',
  })
  @ApiResponse({ status: 201, description: '작성 성공' })
  @ApiBody({ type: CreateBoardDto })
  async create(@Body() createBoardDto: CreateBoardDto) {
    const board = this.boardsService.create(createBoardDto);

    return {
      message: '게시글 생성에 성공했습니다.',
      statusCode: 201,
      data: {
        board: board,
      },
    };
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: '모든 게시글 조회',
    description: '모든 게시글 리스트를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  async findAll() {
    const boards = await this.boardsService.findAll();

    return {
      message: '모든 게시글 조회에 성공했습니다.',
      statusCode: 200,
      data: {
        boards: boards,
      },
    };
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: '특정 게시글 조회',
    description: '게시글 번호와 일치하는 게시글을 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  async findOne(@Param('id') id: string) {
    const board = await this.boardsService.findOne(+id);

    return {
      message: '게시글 조회에 성공했습니다.',
      statusCode: 200,
      data: {
        board: board,
      },
    };
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: '특정 게시글 수정',
    description: '게시글 번호와 일치하는 게시글의 정보를 수정합니다.',
  })
  @ApiResponse({ status: 200, description: '수정 성공' })
  @ApiBody({ type: UpdateBoardDto })
  async update(
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const board = await this.boardsService.update(id, updateBoardDto);

    return {
      message: '게시글 수정에 성공했습니다.',
      statusCode: 200,
      data: {
        board: board,
      },
    };
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: '특정 게시글 삭제',
    description: '게시글 번호와 일치하는 게시글을 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '삭제 성공' })
  async remove(@Param('id') id: number) {
    await this.boardsService.remove(id);
  }
}
