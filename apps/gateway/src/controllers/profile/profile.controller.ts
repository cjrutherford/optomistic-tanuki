import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoalCommands, ProfileCommands, ProjectCommands, ServiceTokens, TimelineCommands } from '@optomistic-tanuki/libs/constants';
import { CreateGoalDto, CreateProfileDto, CreateProjectDto, CreateTimelineDto, UpdateGoalDto, UpdateProfileDto, UpdateProjectDto, UpdateTimelineDto } from '@optomistic-tanuki/libs/models';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
    constructor(@Inject(ServiceTokens.PROFILE_SERVICE) private readonly client: ClientProxy) {}
    
    @ApiOperation({ summary: 'Create a new profile' })
    @ApiResponse({ status: 201, description: 'The profile has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @Post()
    createProfile(@Body() createProfileDto: CreateProfileDto) {
        return this.client.send({ cmd: ProfileCommands.Create }, createProfileDto);
    }

    @ApiOperation({ summary: 'Get a profile by ID' })
    @ApiResponse({ status: 200, description: 'The profile has been successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Profile not found.' })
    @Get(':id')
    getProfile(@Param('id') id: string) {
        return this.client.send({ cmd: ProfileCommands.Get }, id);
    }

    @ApiOperation({ summary: 'Update a profile by ID' })
    @ApiResponse({ status: 200, description: 'The profile has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Profile not found.' })
    @Put(':id')
    updateProfile(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
        return this.client.send({ cmd: ProfileCommands.Update }, { id, ...updateProfileDto });
    }

    @ApiOperation({ summary: 'Delete a profile by ID' })
    @ApiResponse({ status: 200, description: 'The profile has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Profile not found.' })
    @Delete(':id')
    deleteProfile(@Param('id') id: string) {
        return this.client.send({ cmd: ProfileCommands.Delete}, id);
    }

    @ApiTags('project')
    @ApiOperation({ summary: 'Create a new project' })
    @ApiResponse({ status: 201, description: 'The project has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @Post('project')
    createProject(@Body() createProjectDto: CreateProjectDto) {
        return this.client.send({ cmd: ProjectCommands.Create}, createProjectDto);
    }

    @ApiTags('project')
    @ApiOperation({ summary: 'Get a project by ID' })
    @ApiResponse({ status: 200, description: 'The project has been successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Project not found.' })
    @Get('project/:id')
    getProject(@Param('id') id: string) {
        return this.client.send({ cmd: ProjectCommands.Get }, id);
    }

    @ApiTags('project')
    @ApiOperation({ summary: 'Update a project by ID' })
    @ApiResponse({ status: 200, description: 'The project has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Project not found.' })
    @Put('project/:id')
    updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.client.send({ cmd: ProjectCommands.Update }, { id, ...updateProjectDto });
    }

    @ApiTags('project')
    @ApiOperation({ summary: 'Delete a project by ID' })
    @ApiResponse({ status: 200, description: 'The project has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Project not found.' })
    @Delete('project/:id')
    deleteProject(@Param('id') id: string) {
        return this.client.send({ cmd: ProjectCommands.Delete }, id);
    }

    @ApiTags('goal')
    @ApiOperation({ summary: 'Create a new goal' })
    @ApiResponse({ status: 201, description: 'The goal has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @Post('goal')
    createGoal(@Body() createGoalDto: CreateGoalDto) {
        return this.client.send({ cmd: GoalCommands.Create }, createGoalDto);
    }

    @ApiTags('goal')
    @ApiOperation({ summary: 'Get a goal by ID' })
    @ApiResponse({ status: 200, description: 'The goal has been successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Goal not found.' })
    @Get('goal/:id')
    getGoal(@Param('id') id: string) {
        return this.client.send({ cmd: GoalCommands.Get }, id);
    }

    @ApiTags('goal')
    @ApiOperation({ summary: 'Update a goal by ID' })
    @ApiResponse({ status: 200, description: 'The goal has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Goal not found.' })
    @Put('goal/:id')
    updateGoal(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
        return this.client.send({ cmd: GoalCommands.Update }, { id, ...updateGoalDto });
    }

    @ApiTags('goal')
    @ApiOperation({ summary: 'Delete a goal by ID' })
    @ApiResponse({ status: 200, description: 'The goal has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Goal not found.' })
    @Delete('goal/:id')
    deleteGoal(@Param('id') id: string) {
        return this.client.send({ cmd: GoalCommands.Delete }, id);
    }

    @ApiTags('timeline')
    @ApiOperation({ summary: 'Create a new timeline' })
    @ApiResponse({ status: 201, description: 'The timeline has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @Post('timeline')
    createTimeline(@Body() createTimelineDto: CreateTimelineDto) {
        return this.client.send({ cmd: TimelineCommands.Create }, createTimelineDto);
    }

    @ApiTags('timeline')
    @ApiOperation({ summary: 'Get a timeline by ID' })
    @ApiResponse({ status: 200, description: 'The timeline has been successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Timeline not found.' })
    @Get('timeline/:id')
    getTimeline(@Param('id') id: string) {
        return this.client.send({ cmd: 'getTimeline' }, id);
    }

    @ApiTags('timeline')
    @ApiOperation({ summary: 'Update a timeline by ID' })
    @ApiResponse({ status: 200, description: 'The timeline has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Timeline not found.' })
    @Put('timeline/:id')
    updateTimeline(@Param('id') id: string, @Body() updateTimelineDto: UpdateTimelineDto) {
        return this.client.send({ cmd: TimelineCommands.Update }, { id, ...updateTimelineDto });
    }

    @ApiTags('timeline')
    @ApiOperation({ summary: 'Delete a timeline by ID' })
    @ApiResponse({ status: 200, description: 'The timeline has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Timeline not found.' })
    @Delete('timeline/:id')
    deleteTimeline(@Param('id') id: string) {
        return this.client.send({ cmd: TimelineCommands.Delete }, id);
    }
}
