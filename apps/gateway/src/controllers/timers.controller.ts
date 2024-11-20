
import { Controller, Post, Get, Put, Delete, Body, Param, Inject } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { CreateTimerDto, UpdateTimerDto } from "@optomistic-tanuki/libs/models";
import { TimersCommands } from "@optomistic-tanuki/libs/constants";

@Controller('timers')
export class TimersController {

    constructor(@Inject('TASKS_SERVICE') private readonly client: ClientProxy) {}

    @Post()
    async create(@Body() createTimerDto: CreateTimerDto) {
        return this.client.send({ cmd: TimersCommands.CREATE }, createTimerDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.client.send({ cmd: TimersCommands.FIND_ONE }, id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTimerDto: UpdateTimerDto) {
        return this.client.send({ cmd: TimersCommands.UPDATE }, { id, data: updateTimerDto });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.client.send({ cmd: TimersCommands.DELETE }, id);
    }
}