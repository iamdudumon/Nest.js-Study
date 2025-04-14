import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: '김두두', description: '사용자 이름' })
  name: string;

  @ApiProperty({ example: 'dudu@dudu.com', description: '사용자 이메일' })
  email: string;

  @ApiProperty({ example: '010-1234-5678', description: '사용자 휴대번호' })
  phone?: string;
}
