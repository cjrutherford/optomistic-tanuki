import { Controller } from '@nestjs/common';
import { FindOneOptions, FindManyOptions } from 'typeorm';
import { Profile } from '../profiles/entities/profile.entity';
import { ProfileService } from '../app/profile.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProfileCommands } from '@optomistic-tanuki/libs/constants';
import { CreateProfileDto, UpdateProfileDto } from '@optomistic-tanuki/libs/models';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profileService: ProfileService) {}

    @MessagePattern({ cmd: ProfileCommands.Create })
    async createProfile(@Payload() createProfileDto: CreateProfileDto) {
        return await this.profileService.create(createProfileDto);
    }

    @MessagePattern({ cmd: ProfileCommands.Get })
    async getProfile(@Payload() data: { id: string, query: FindOneOptions<Profile> }) {
        return await this.profileService.findOne(data.id, data.query);
    }

    @MessagePattern({ cmd: ProfileCommands.GetAll })
    async getAllProfiles(@Payload() query: FindManyOptions<Profile>) {
        return await this.profileService.findAll(query);
    }

    @MessagePattern({ cmd: ProfileCommands.Update })
    async updateProfile(@Payload() data: UpdateProfileDto) {
        return await this.profileService.update(data.id, data);
    }

}
