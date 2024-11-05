import { Body, Controller, Inject, Post, Put, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AttachmentCommands, CommentCommands, PostCommands, VoteCommands } from "@optomistic-tanuki/libs/constants";
import { AttachmentDto, CommentDto, CreateAttachmentDto, CreateCommentDto, CreatePostDto, CreateVoteDto, PostDto, SearchAttachmentDto, SearchCommentDto, SearchPostDto, UpdateAttachmentDto, UpdateCommentDto, UpdatePostDto, VoteDto } from "@optomistic-tanuki/libs/models";
import { Get, Param } from "@nestjs/common";
import { firstValueFrom } from 'rxjs';

@Controller('social')
export class SocialController {
    constructor(@Inject('SOCIAL_SERVICE') private readonly socialClient: ClientProxy) {}

    @Post('post')
    async post(@Body() postDto: CreatePostDto) {
        return await firstValueFrom(this.socialClient.send({ cmd: PostCommands.CREATE }, postDto));
    }

    @Post('vote')
    async vote(@Body() voteDto: CreateVoteDto) {
        const commandMap = {
            '-1': VoteCommands.DOWNVOTE,
            '0': VoteCommands.UNVOTE,
            '1': VoteCommands.UPVOTE,
        }
        return await firstValueFrom(this.socialClient.send({ cmd: commandMap[voteDto.value.toString()] }, voteDto));
    }

    @Post('comment')
    async comment(@Body() commentDto: CreateCommentDto) {
        return await firstValueFrom(this.socialClient.send({ cmd: CommentCommands.CREATE }, commentDto));
    }

    @Post('attachment')
    async attachment(@Body() attachmentDto: CreateAttachmentDto) {
        return await firstValueFrom(this.socialClient.send({ cmd: AttachmentCommands.CREATE }, attachmentDto));
    }

    @Get('post/:id')
    async getPost(@Param('id') id: string): Promise<PostDto> {
        return await firstValueFrom(this.socialClient.send({ cmd: PostCommands.FIND }, { id }));
    }

    @Get('comment/:id')
    async getComment(@Param('id') id: string): Promise<CommentDto> {
        return await firstValueFrom(this.socialClient.send({ cmd: CommentCommands.FIND }, { id }));
    }

    @Get('vote/:id')
    async getVote(@Param('id') id: string): Promise<VoteDto> {
        return await firstValueFrom(this.socialClient.send({ cmd: VoteCommands.GET }, { id }));
    }

    @Get('attachment/:id')
    async getAttachment(@Param('id') id: string): Promise<AttachmentDto> {
        return await firstValueFrom(this.socialClient.send({ cmd: AttachmentCommands.FIND }, { id }));
    }

    @Post('posts/find')
    async searchPosts(@Body() searchCriteria: SearchPostDto): Promise<PostDto[]> {
        return await firstValueFrom(this.socialClient.send({ cmd: PostCommands.FIND_MANY }, searchCriteria));
    }

    @Post('comments/find')
    async searchComments(@Body() searchCriteria: SearchCommentDto): Promise<CommentDto[]> {
        return await firstValueFrom(this.socialClient.send({ cmd: CommentCommands.FIND_MANY }, searchCriteria));
    }


    @Post('attachments/find')
    async searchAttachments(@Body() searchCriteria: SearchAttachmentDto): Promise<AttachmentDto[]> {
        return await firstValueFrom(this.socialClient.send({ cmd: AttachmentCommands.FIND_MANY }, searchCriteria));
    }

    @Put('post/update/:id')
    async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<PostDto> {
        return await firstValueFrom(this.socialClient.send({ cmd: PostCommands.UPDATE }, { id, data: updatePostDto }));
    }

    @Put('comment/update/:id')
    async updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<CommentDto> {
        return await firstValueFrom(this.socialClient.send({ cmd: CommentCommands.UPDATE }, { id, data: updateCommentDto }));
    }

    @Put('attachment/update/:id')
    async updateAttachment(@Param('id') id: string, @Body() updateAttachmentDto: UpdateAttachmentDto): Promise<AttachmentDto> {
        return await firstValueFrom(this.socialClient.send({ cmd: AttachmentCommands.UPDATE }, { id, data: updateAttachmentDto }));
    }

    @Delete('post/:id')
    async deletePost(@Param('id') id: string): Promise<void> {
        return await firstValueFrom(this.socialClient.send({ cmd: PostCommands.DELETE }, { id }));
    }

    @Delete('comment/:id')
    async deleteComment(@Param('id') id: string): Promise<void> {
        return await firstValueFrom(this.socialClient.send({ cmd: CommentCommands.DELETE }, { id }));
    }

    @Delete('attachment/:id')
    async deleteAttachment(@Param('id') id: string): Promise<void> {
        return await firstValueFrom(this.socialClient.send({ cmd: AttachmentCommands.DELETE }, { id }));
    }
}