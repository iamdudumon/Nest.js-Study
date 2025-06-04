// import { Injectable } from '@nestjs/common';
// import { CommentRepository } from './comments.repoistory.interface';
// import { Comment } from '../entities/comment.entity';
// import { CreateCommentDto } from '../dto/create-comment.dto';

// @Injectable()
// export class MemoryCommentRepository implements CommentRepository {
//   private comments: Comment[] = [];
//   private id = 1;

//   save(createDto: CreateCommentDto): Comment {
//     const newComment: Comment = {
//       id: this.id++,
//       ...createDto,
//       createdAt: new Date(),
//     };
//     this.comments.push(newComment);
//     return newComment;
//   }

//   findByBoardId(boardId: number): Comment[] {
//     return this.comments.filter((b) => b.boardId === boardId);
//   }

//   removeByBoardId(boardId: number): boolean {
//     const before = this.findByBoardId.length;
//     this.comments = this.comments.filter((b) => b.boardId !== boardId);
//     return this.comments.length < before;
//   }

//   //   update(id: number, updateDto: UpdateBoardDto): Board | undefined {
//   // 	const board = this.findById(id);
//   // 	if (!board) return undefined;
//   // 	Object.assign(board, updateDto);
//   // 	return board;
//   //   }

//   //   remove(id: number): boolean {
//   // 	const before = this.boards.length;
//   // 	this.boards = this.boards.filter((b) => b.id !== id);
//   // 	return this.boards.length < before;
//   //   }
// }
