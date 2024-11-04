import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateGoalDto, CreateProfileDto, CreateProjectDto, CreateTimelineDto, UpdateGoalDto, UpdateProfileDto, UpdateProjectDto, UpdateTimelineDto } from '@optomistic-tanuki/libs/models';

@Controller('profile')
export class ProfileController {
    constructor(@Inject('PROFILE_SERVICE') private readonly client: ClientProxy) {}

    @Post()
    createProfile(@Body() createProfileDto: CreateProfileDto) {
        return this.client.send({ cmd: 'createProfile' }, createProfileDto);
    }

    @Get(':id')
    getProfile(@Param('id') id: string) {
        return this.client.send({ cmd: 'getProfile' }, id);
    }

    @Put(':id')
    updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
        return this.client.send({ cmd: 'updateProfile' }, { id, ...updateProfileDto });
    }

    @Delete(':id')
    deleteProfile(@Param('id') id: string) {
        return this.client.send({ cmd: 'deleteProfile' }, id);
    }

    @Post('project')
    createProject(@Body() createProjectDto: CreateProjectDto) {
        return this.client.send({ cmd: 'createProject' }, createProjectDto);
    }

    @Get('project/:id')
    getProject(@Param('id') id: string) {
        return this.client.send({ cmd: 'getProject' }, id);
    }

    @Put('project/:id')
    updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.client.send({ cmd: 'updateProject' }, { id, ...updateProjectDto });
    }

    @Delete('project/:id')
    deleteProject(@Param('id') id: string) {
        return this.client.send({ cmd: 'deleteProject' }, id);
    }

    @Post('goal')
    createGoal(@Body() createGoalDto: CreateGoalDto) {
        return this.client.send({ cmd: 'createGoal' }, createGoalDto);
    }

    @Get('goal/:id')
    getGoal(@Param('id') id: string) {
        return this.client.send({ cmd: 'getGoal' }, id);
    }

    @Put('goal/:id')
    updateGoal(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
        return this.client.send({ cmd: 'updateGoal' }, { id, ...updateGoalDto });
    }

    @Delete('goal/:id')
    deleteGoal(@Param('id') id: string) {
        return this.client.send({ cmd: 'deleteGoal' }, id);
    }

    @Post('timeline')
    createTimeline(@Body() createTimelineDto: CreateTimelineDto) {
        return this.client.send({ cmd: 'createTimeline' }, createTimelineDto);
    }

    @Get('timeline/:id')
    getTimeline(@Param('id') id: string) {
        return this.client.send({ cmd: 'getTimeline' }, id);
    }

    @Put('timeline/:id')
    updateTimeline(@Param('id') id: string, @Body() updateTimelineDto: UpdateTimelineDto) {
        return this.client.send({ cmd: 'updateTimeline' }, { id, ...updateTimelineDto });
    }

    @Delete('timeline/:id')
    deleteTimeline(@Param('id') id: string) {
        return this.client.send({ cmd: 'deleteTimeline' }, id);
    }
}
