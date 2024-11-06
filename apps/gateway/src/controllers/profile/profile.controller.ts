import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GoalCommands, ProfileCommands, ProjectCommands, TimelineCommands } from '@optomistic-tanuki/libs/constants';
import { CreateGoalDto, CreateProfileDto, CreateProjectDto, CreateTimelineDto, UpdateGoalDto, UpdateProfileDto, UpdateProjectDto, UpdateTimelineDto } from '@optomistic-tanuki/libs/models';

@Controller('profile')
export class ProfileController {
    constructor(@Inject('PROFILE_SERVICE') private readonly client: ClientProxy) {}

    @Post()
    createProfile(@Body() createProfileDto: CreateProfileDto) {
        return this.client.send({ cmd: ProfileCommands.Create }, createProfileDto);
    }

    @Get(':id')
    getProfile(@Param('id') id: string) {
        return this.client.send({ cmd: ProfileCommands.Get }, id);
    }

    @Put(':id')
    updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
        return this.client.send({ cmd: ProfileCommands.Update }, { id, ...updateProfileDto });
    }

    @Delete(':id')
    deleteProfile(@Param('id') id: string) {
        return this.client.send({ cmd: ProfileCommands.Delete}, id);
    }

    @Post('project')
    createProject(@Body() createProjectDto: CreateProjectDto) {
        return this.client.send({ cmd: ProjectCommands.Create}, createProjectDto);
    }

    @Get('project/:id')
    getProject(@Param('id') id: string) {
        return this.client.send({ cmd: ProjectCommands.Get }, id);
    }

    @Put('project/:id')
    updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.client.send({ cmd: ProjectCommands.Update }, { id, ...updateProjectDto });
    }

    @Delete('project/:id')
    deleteProject(@Param('id') id: string) {
        return this.client.send({ cmd: ProjectCommands.Delete }, id);
    }

    @Post('goal')
    createGoal(@Body() createGoalDto: CreateGoalDto) {
        return this.client.send({ cmd: GoalCommands.Create }, createGoalDto);
    }

    @Get('goal/:id')
    getGoal(@Param('id') id: string) {
        return this.client.send({ cmd: GoalCommands.Get }, id);
    }

    @Put('goal/:id')
    updateGoal(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
        return this.client.send({ cmd: GoalCommands.Update }, { id, ...updateGoalDto });
    }

    @Delete('goal/:id')
    deleteGoal(@Param('id') id: string) {
        return this.client.send({ cmd: GoalCommands.Delete }, id);
    }

    @Post('timeline')
    createTimeline(@Body() createTimelineDto: CreateTimelineDto) {
        return this.client.send({ cmd: TimelineCommands.Create }, createTimelineDto);
    }

    @Get('timeline/:id')
    getTimeline(@Param('id') id: string) {
        return this.client.send({ cmd: 'getTimeline' }, id);
    }

    @Put('timeline/:id')
    updateTimeline(@Param('id') id: string, @Body() updateTimelineDto: UpdateTimelineDto) {
        return this.client.send({ cmd: TimelineCommands.Update }, { id, ...updateTimelineDto });
    }

    @Delete('timeline/:id')
    deleteTimeline(@Param('id') id: string) {
        return this.client.send({ cmd: TimelineCommands.Delete }, id);
    }
}
