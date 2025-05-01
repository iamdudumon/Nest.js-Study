import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: '1', description: '게시글 ID' })
  boardId: number;

  @ApiProperty({ example: '1', description: '댓글 작성자 ID' })
  authorId: number;

  @ApiProperty({ example: '테스트 댓글', description: '댓글 내용' })
  content: string;

  @ApiProperty({ example: '3', description: '댓글 별점' })
  rating: number;
}
