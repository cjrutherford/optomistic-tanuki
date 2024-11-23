
import { Controller, Post, Get, Put, Delete, Body, Param, Query } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { CreateTaskDto, SearchTaskDto, UpdateTaskDto } from "@optomistic-tanuki/libs/models";
import { TasksCommands } from "@optomistic-tanuki/libs/constants";

@Controller('tasks')
export class TasksController {

    constructor(private readonly client: ClientProxy) {}

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        return this.client.send({ cmd: TasksCommands.CREATE }, createTaskDto);
    }

    @Get()
    async findAll(@Query() search?: SearchTaskDto) {
        return this.client.send({ cmd: TasksCommands.FIND_ALL }, search);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.client.send({ cmd: TasksCommands.FIND_ONE }, id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.client.send({ cmd: TasksCommands.UPDATE }, { id, data: updateTaskDto });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.client.send({ cmd: TasksCommands.DELETE }, id);
    }
}