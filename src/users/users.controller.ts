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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: '사용자 생성',
    description: '새 사용자를 생성합니다.',
  })
  @ApiResponse({ status: 201, description: '생성 성공' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      message: '사용자 생성에 성공했습니다.',
      statusCode: 201,
      data: {
        user: user,
      },
    };
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: '모든 사용자 조회',
    description: '모든 사용자 리스트를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  async findAll() {
    const users = await this.usersService.findAll();

    return {
      message: '모든 사용자 조회에 성공했습니다.',
      statusCode: 200,
      data: {
        users: users,
      },
    };
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: '특정 사용자 조회',
    description: '사용자 번호와 일치하는 사용자를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);

    return {
      message: '사용자 조회에 성공했습니다.',
      statusCode: 200,
      data: {
        user: user,
      },
    };
  }

  @Get(':id/posts')
  @ApiOperation({
    summary: '특정 사용자가 작성한 게시글 조회',
    description: '특정 사용자가 작성한 게시글만 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  async findByAuthorId(@Param('id') id: string) {
    const boards = await this.usersService.findBoardsByAuthorId(+id); // Todo: 게시글 하나가 아닌 게시글 리스트 조회 필요

    return {
      message: '사용자가 작성한 게시글 조회에 성공했습니다.',
      statusCode: 200,
      data: {
        boards: boards,
      },
    };
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: '특정 사용자 변경',
    description: '사용자 번호와 일치하는 사용자 정보를 수정합니다.',
  })
  @ApiResponse({ status: 200, description: '수정 성공' })
  @ApiBody({ type: UpdateUserDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: '특정 사용자 삭제',
    description: '사용자 번호와 일치하는 사용자 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '삭제 성공' })
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
  }
}
