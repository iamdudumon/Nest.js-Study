import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  @ApiOperation({
    summary: '사용자 생성',
    description: '새 사용자를 생성합니다.',
  })
  @ApiResponse({ status: 201, description: '생성 성공' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
    return '201';
  }

  @Get()
  @ApiOperation({
    summary: '모든 사용자 조회',
    description: '모든 사용자 리스트를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 사용자 조회',
    description: '사용자 번호와 일치하는 사용자를 조회합니다.',
  })
  @ApiResponse({ status: 200, description: '조회 성공' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '특정 사용자 변경',
    description: '사용자 번호와 일치하는 사용자 정보를 수정합니다.',
  })
  @ApiResponse({ status: 200, description: '수정 성공' })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (this.usersService.update(+id, updateUserDto)) return '200';
    return '404';
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 사용자 삭제',
    description: '사용자 번호와 일치하는 사용자 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '삭제 성공' })
  remove(@Param('id') id: string) {
    this.usersService.remove(+id);
    return '200';
  }
}
