import { Column, Entity, FindManyOptions, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TimerEntity } from "./timer.entity";
import { NoteEntity } from "./note.entity";
import { SearchTaskDto } from "@optomistic-tanuki/libs/models";

export enum TaskStatus {
    Draft = 'draft',
    Published = 'published',
    Archived = 'archived',
    Deleted = 'deleted',
    Public = 'public',
}

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    deletedAt: Date;

    @OneToMany(type => TimerEntity, timer => timer.task)    
    timers: TimerEntity[];

    @OneToMany(type => NoteEntity, note => note.task)
    notes: NoteEntity[];

    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.Draft })
    status: TaskStatus;
}

export function convertSearchTaskDtoToFindOptions(searchDto: SearchTaskDto): FindManyOptions<TaskEntity> {
    const findOptions: FindManyOptions<TaskEntity> = {
        where: {}
    };

    if (searchDto.title) {
        findOptions.where['title'] = searchDto.title;
    }

    if (searchDto.description) {
        findOptions.where['description'] = searchDto.description;
    }

    if (searchDto.status) {
        findOptions.where['status'] = searchDto.status;
    }

    if(searchDto.filterColumn && searchDto.filterValue && searchDto.filterOperator) {
        switch (searchDto.filterOperator) {
            case '=':
                findOptions.where[searchDto.filterColumn] = searchDto.filterValue;
                break;
            case '!=':
                findOptions.where[searchDto.filterColumn] = Not(searchDto.filterValue);
                break;
            case '<':
                findOptions.where[searchDto.filterColumn] = LessThan(searchDto.filterValue);
                break;
            case '<=':
                findOptions.where[searchDto.filterColumn] = LessThanOrEqual(searchDto.filterValue);
                break;
            case '>':
                findOptions.where[searchDto.filterColumn] = MoreThan(searchDto.filterValue);
                break;
            case '>=':
                findOptions.where[searchDto.filterColumn] = MoreThanOrEqual(searchDto.filterValue);
                break;
            case 'LIKE':
                findOptions.where[searchDto.filterColumn] = Like(`%${searchDto.filterValue}%`);
                break;
            default:
                throw new Error(`Unsupported filter operator: ${searchDto.filterOperator}`);
        }
    }

    return findOptions;
}