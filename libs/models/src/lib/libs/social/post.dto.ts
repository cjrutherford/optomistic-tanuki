import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
    @ApiProperty({ description: 'The unique identifier of the post' })
    id: string;

    @ApiProperty({ description: 'The title of the post' })
    title: string;

    @ApiProperty({ description: 'The content of the post' })
    content: string;

    @ApiProperty({ description: 'The date the post was created' })
    createdAt: Date;

    @ApiProperty({ description: 'The date the post was last updated' })
    updatedAt: Date;
}