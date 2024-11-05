import { Inject, Injectable } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Comment } from "../../entities/comment.entity";
import { Repository, FindOneOptions, FindManyOptions } from "typeorm";
import { CreateCommentDto, UpdateCommentDto } from "@optomistic-tanuki/libs/models";

@Injectable()
export class CommentService {
    constructor(@Inject(getRepositoryToken(Comment)) private readonly commentRepo: Repository<Comment>) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const comment = await this.commentRepo.create(createCommentDto);
        return await this.commentRepo.save(comment);
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