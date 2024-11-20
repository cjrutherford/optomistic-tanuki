
import { Controller, Post, Get, Put, Delete, Body, Param, Query, Inject } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { CreateNoteDto, SearchNoteDto, UpdateNoteDto } from "@optomistic-tanuki/libs/models";
import { NotesCommands } from "@optomistic-tanuki/libs/constants";

@Controller('notes')
export class NotesController {

    constructor(@Inject('TASKS_SERVICE') private readonly client: ClientProxy) {}

    @Post()
    async create(@Body() createNoteDto: CreateNoteDto) {
        return this.client.send({ cmd: NotesCommands.CREATE }, createNoteDto);
    }

    @Get()
    async findAll(@Query() search?: SearchNoteDto) {
        return this.client.send({ cmd: NotesCommands.FIND_ALL }, search);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.client.send({ cmd: NotesCommands.FIND_ONE }, id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
        return this.client.send({ cmd: NotesCommands.UPDATE }, { id, data: updateNoteDto });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.client.send({ cmd: NotesCommands.DELETE }, id);
    }
}