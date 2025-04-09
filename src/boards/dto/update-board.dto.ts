import { PartialType } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty({ example: '1', description: '게시글 번호' })
  id: number;
}
