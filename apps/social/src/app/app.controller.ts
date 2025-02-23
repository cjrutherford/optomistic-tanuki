import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { PostService } from './services/post.service';
import { AttachmentService } from './services/attachment.service';
import { CommentService } from './services/comment.service';
import { VoteService } from './services/vote.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AttachmentCommands, CommentCommands, LinkCommands, PostCommands, VoteCommands } from '@optomistic-tanuki/libs/constants';
import { CreateAttachmentDto, CreateCommentDto, CreateLinkDto, CreatePostDto, SearchAttachmentDto, SearchCommentDto, SearchPostDto, UpdateAttachmentDto, UpdateCommentDto, UpdateLinkDto, UpdatePostDto } from '@optomistic-tanuki/libs/models';
import { postSearchDtoToFindManyOptions } from '../entities/post.entity';
import { transformSearchCommentDtoToFindOptions } from '../entities/comment.entity';
import { Attachment, toFindOptions } from '../entities/attachment.entity';
import { FindManyOptions, FindOneOptions, FindOptions } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly postService: PostService,
    private readonly voteService: VoteService,
    private readonly attachmentService: AttachmentService,
    private readonly commentService: CommentService,
  ) { }

  @MessagePattern({ cmd: PostCommands.CREATE })
  async createPost(data: CreatePostDto) {
    console.log("Post Data: ", data)
    return await this.postService.create(data);
  }

  @MessagePattern({ cmd: PostCommands.FIND_MANY })
  async findAllPosts(@Payload() data: SearchPostDto) {
    const searchOptions = postSearchDtoToFindManyOptions(data);
    return await this.postService.findAll(searchOptions);
  }

  @MessagePattern({ cmd: PostCommands.FIND })
  async findOnePost(@Payload('id') id: string, @Payload('options') options?: SearchPostDto) {
    const search = postSearchDtoToFindManyOptions(options);
    return await this.postService.findOne(id, search);
  }

  @MessagePattern({ cmd: PostCommands.UPDATE })
  async updatePost(@Payload('id') id: number, @Payload('data') data: UpdatePostDto) {
    return await this.postService.update(id, data);
  }

  @MessagePattern({ cmd: PostCommands.DELETE })
  async removePost(@Payload('id') id: number) {
    return await this.postService.remove(id);
  }

  @MessagePattern({ cmd: VoteCommands.UPVOTE })
  async upvotePost(@Payload('id') id: string, @Payload('userId') userId: string) {
    return await this.voteService.create({
      postId: id, value: 1,
      userId: userId,
    });
  }

  @MessagePattern({ cmd: VoteCommands.DOWNVOTE })
  async downvotePost(@Payload('id') id: string, @Payload('userId') userId: string) {
    return await this.voteService.create({
      postId: id, value: -1,
      userId: userId,
    });
  }

  @MessagePattern({ cmd: VoteCommands.UNVOTE })
  async unvotePost(@Payload('id') id: number) {
    return await this.voteService.remove(id);
  }

  @MessagePattern({ cmd: VoteCommands.GET })
  async getVote(@Payload('postid') id: string) {
    return await this.voteService.findAll({ where: { post: { id } } });
  }


  @MessagePattern({ cmd: CommentCommands.CREATE })
  async createComment(data: CreateCommentDto) {
    console.log("🚀 ~ AppController ~ createComment ~ data:", data)
    return await this.commentService.create(data);
  }

  @MessagePattern({ cmd: CommentCommands.FIND_MANY })
  async findAllComments(@Payload() data: SearchCommentDto) {
    const options = transformSearchCommentDtoToFindOptions(data);
    return await this.commentService.findAll(options);
  }

  @MessagePattern({ cmd: CommentCommands.FIND })
  async findOneComment(@Payload('id') id: string, @Payload('options') options?: SearchCommentDto) {
    const search = transformSearchCommentDtoToFindOptions(options);
    return await this.commentService.findOne(id, search);
  }

  @MessagePattern({ cmd: CommentCommands.UPDATE })
  async updateComment(@Payload('id') id: string, @Payload('data') data: UpdateCommentDto) {
    return await this.commentService.update(id, data);
  }

  @MessagePattern({ cmd: CommentCommands.DELETE })
  async removeComment(@Payload('id') id: string) {
    return await this.commentService.remove(id);
  }

  @MessagePattern({ cmd: AttachmentCommands.CREATE })
  async createAttachment(@Payload('attachment') data: CreateAttachmentDto, @Payload('postId') postId: string) {
    const post = await this.postService.findOne(postId);
    return await this.attachmentService.create(data, post);
  }

  @MessagePattern({ cmd: AttachmentCommands.FIND_MANY })
  async findAllAttachments(@Payload() options: SearchAttachmentDto) {
    const search = toFindOptions(options)
    return await this.attachmentService.findAll(search as FindManyOptions<Attachment>);
  }

  @MessagePattern({ cmd: AttachmentCommands.FIND })
  async findAttachment(@Payload('id') id: string, @Payload('options') opts: SearchAttachmentDto) {
    const search = toFindOptions(opts);
    return await this.attachmentService.findOne(id, search as FindOneOptions<Attachment>);
  }

  @MessagePattern({ cmd: AttachmentCommands.UPDATE })
  async updateAttachment(@Payload('id') id: string, @Payload('update') update: UpdateAttachmentDto) {
    return await this.attachmentService.update(id, update);
  }

  @MessagePattern({ cmd: AttachmentCommands.DELETE })
  async deleteAttachment(@Payload('id') id: string) {
    return await this.attachmentService.remove(id);
  }

  @MessagePattern({ cmd: LinkCommands.CREATE })
  async createLink(@Payload() dto: CreateLinkDto) {
    throw new RpcException('Link Object Not implemented');
  }

  @MessagePattern({ cmd: LinkCommands.UPDATE })
  async updateLink(@Payload('id') id: string, @Payload('link') dto: UpdateLinkDto) {
    throw new Error('Link Object Not Implemented')
  }

  @MessagePattern({ cmd: LinkCommands.FIND })
  async findLink(@Payload('id') id: string) {
    throw new Error('Link Object Not Implemented')
  }

  @MessagePattern({ cmd: LinkCommands.FIND_MANY })
  async findAllLinks(@Payload() options: FindOptions) {
    throw new Error('Link Object Not Implemented')
  }

}
