
import { NoteDto } from "./note.dto";
import { TimerDto } from "./timer.dto";

export enum TaskStatus {
    Draft = 'draft',
    Published = 'published',
    Archived = 'archived',
    Deleted = 'deleted',
    Public = 'public',
}

export class TaskDto {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    status: TaskStatus;
    timers: string[];
    notes: string[];
}