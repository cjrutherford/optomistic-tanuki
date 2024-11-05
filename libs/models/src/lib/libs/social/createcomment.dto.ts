import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'Content of the comment' })
  content: string;

  @ApiProperty({ description: 'ID of the author' })
  authorId: string;

  @ApiProperty({ description: 'ID of the post' })
  postId: string;
}
