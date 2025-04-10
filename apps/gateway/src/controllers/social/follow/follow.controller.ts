import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ServiceTokens, FollowCommands, ProfileCommands } from '@optomistic-tanuki/libs/constants';
import { AuthGuard } from '../../../auth/auth.guard';
import { User, UserDetails } from '../../../decorators/user.decorator';
import { UpdateFollowDto } from '@optomistic-tanuki/libs/models';
import { firstValueFrom } from 'rxjs';

@Controller('follow')
export class FollowController {
    constructor(
        @Inject(ServiceTokens.SOCIAL_SERVICE) private readonly socialClient: ClientProxy,
        @Inject(ServiceTokens.PROFILE_SERVICE) private readonly profileClient: ClientProxy,
    ) {}


    @UseGuards(AuthGuard)
    @ApiTags('follow')
    @ApiOperation({ summary: 'Follow a user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully followed.' })
    @Post('/')
    async follow(@User() user: UserDetails, @Body() followDto: UpdateFollowDto) {
        const followingProfile = await firstValueFrom(this.profileClient.send({ cmd: ProfileCommands.Get }, { id: followDto.followerId }));
        if (!followingProfile) {
            throw new Error('Profile not found');
        }
        if(followingProfile.userId !== user.userId) {
            throw new Error("You can't add a follow for someone else as the follower!")
        }
        return await firstValueFrom(this.socialClient.send({ cmd: FollowCommands.FOLLOW }, followDto));
    }

    @UseGuards(AuthGuard)
    @ApiTags('follow')
    @ApiOperation({ summary: 'Unfollow a user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully unfollowed.' })
    @Post('/unfollow')
    async unfollow(@User() user: UserDetails, @Body() followDto: UpdateFollowDto) {
        const followingProfile = await firstValueFrom(this.profileClient.send({ cmd: ProfileCommands.Get }, { id: followDto.followerId }));
        if (!followingProfile) {
            throw new Error('Profile not found');
        }
        if(followingProfile.userId !== user.userId) {
            throw new Error("You can't remove a follow for someone else as the follower!")
        }
        return await firstValueFrom(this.socialClient.send({ cmd: FollowCommands.UNFOLLOW }, followDto));
    }

    @UseGuards(AuthGuard)
    @ApiTags('follow')
    @ApiOperation({ summary: 'Get followers of a user' })
    @ApiResponse({ status: 201, description: 'The followers have been successfully retrieved.' })
    @Get('/:id')
    async getFollowers(@Param('id') id: string) {
        return await firstValueFrom(this.socialClient.send({ cmd: FollowCommands.GET_FOLLOWERS }, { foloweeId: id}));
    }

    @UseGuards(AuthGuard)
    @ApiTags('follow')
    @ApiOperation({ summary: 'Get following of a user' })
    @ApiResponse({ status: 201, description: 'The following have been successfully retrieved.' })
    @Get('/following/:id')
    async getFollowing(@Param('id') id: string) {
        return await firstValueFrom(this.socialClient.send({ cmd: FollowCommands.GET_FOLLOWING }, { followerId: id }));
    }

    @UseGuards(AuthGuard)
    @ApiTags('follow')
    @ApiOperation({ summary: 'Get mutual follows of user' })
    @ApiResponse({ status: 201, description: 'The mutual follows have been successfully retrieved.' })
    @Get('/mutuals/:id')
    async getMutuals(@Param('id') id: string) {
        return await firstValueFrom(this.socialClient.send({ cmd: FollowCommands.GET_MUTUALS }, { followerId: id }));
    }

    @UseGuards(AuthGuard)
    @ApiTags('follow')
    @ApiOperation({ summary: 'Get following count' })
    @ApiResponse({ status: 201, description: 'The following count has been successfully retrieved.' })
    @Get('/following/:id/count')
    async getFollowingCount(@Param('id') id: string) {
        return await firstValueFrom(this.socialClient.send({ cmd: FollowCommands.GET_FOLLOWING_COUNT }, { followerId: id }));
    }

    @UseGuards(AuthGuard)
    @ApiTags('follow')
    @ApiOperation({ summary: 'Get follower count' })
    @ApiResponse({ status: 201, description: 'The follower count has been successfully retrieved.' })
    @Get('/:id/count')
    async getFollowerCount(@Param('id') id: string) {
        return await firstValueFrom(this.socialClient.send({ cmd: FollowCommands.GET_FOLLOWER_COUNT }, { followeeId: id }));
    }
}
