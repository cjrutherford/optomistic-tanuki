import { Inject, Injectable } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Profile } from "../profiles/entities/profile.entity";
import { CreateProfileDto } from "../profiles/dto/create-profile.dto";
import { UpdateProfileDto } from "../profiles/dto/update-profile.dto";

@Injectable()
export class ProfileService {
    constructor(
        @Inject(getRepositoryToken(Profile))
        private readonly profileRepository: Repository<Profile>,
    ) { }

    async findAll(query?: FindManyOptions<Profile>): Promise<Profile[]> {
        return await this.profileRepository.find(query || {});
    }

    async findOne(id: string, query?: FindOneOptions<Profile>): Promise<Profile> {
        return await this.profileRepository.findOne({ where: { id }, ...query});
    }

    async create(profile: CreateProfileDto): Promise<Profile> {
        return await this.profileRepository.save(profile);
    }

    async update(id: string, profile: UpdateProfileDto): Promise<Profile> {
        await this.profileRepository.update(id, profile);
        return await this.profileRepository.findOne({where: { id }});
    }
}