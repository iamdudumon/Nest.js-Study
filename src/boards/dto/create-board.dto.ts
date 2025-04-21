import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({ example: '테스트1', description: '게시글 제목' })
  title: string;

  @ApiProperty({ example: '테스트 진행중', description: '게시글 내용' })
  content: string;

  @ApiProperty({ example: '테스트 작성자', description: '게시글 작성자' })
  authorId: number;
}
