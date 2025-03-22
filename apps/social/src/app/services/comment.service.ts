import { Inject, Injectable } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Comment } from "../../entities/comment.entity";
import { Repository, FindOneOptions, FindManyOptions } from "typeorm";
import { CreateCommentDto, UpdateCommentDto } from "@optomistic-tanuki/libs/models";
import { RpcException } from "@nestjs/microservices";
import { Post } from "../../entities/post.entity";

@Injectable()
export class CommentService {
    constructor(
        @Inject(getRepositoryToken(Comment)) private readonly commentRepo: Repository<Comment>,
        @Inject(getRepositoryToken(Post)) private readonly postRepo: Repository<Post>,
    ) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        try {
            const post = await this.postRepo.findOne({ where: { id: createCommentDto.postId } });
            if (!post) {
                throw new RpcException('Post not found');
            }
            const commentToCreate: Partial<Comment> = {
                ...createCommentDto,
                post,
            };
            const comment = await this.commentRepo.create(createCommentDto);
            return await this.commentRepo.save(comment);
        } catch (error) {
            throw new RpcException(error.message);
        }
    }

    async findAll(options?: FindManyOptions<Comment>): Promise<Comment[]> {
        return await this.commentRepo.find(options);
    }

    async findOne(id: string, options?: FindOneOptions<Comment>): Promise<Comment> {
        return await this.commentRepo.findOne({ where: { id }, ...options });
    }

    async update(id: string, updateCommentDto: UpdateCommentDto): Promise<void> {
        await this.commentRepo.update(id, updateCommentDto);
    }

    async remove(id: string): Promise<void> {
        await this.commentRepo.delete(id);
    }
}