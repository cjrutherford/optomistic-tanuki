import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TimerEntity } from "./timer.entity";

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
}