import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.entity";

export enum TimerStatus {
    ACTIVE = 'active',
    PAUSED = 'paused',
    COMPLETED = 'completed',
    DELETED = 'deleted'
}

@Entity()
export class TimerEntity {
    // Add properties here
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => TaskEntity, task => task.timers)
    task: TaskEntity;

    @Column()
    start: Date;

    @Column()
    end: Date;

    @Column()
    duration: number;

    @Column()
    description: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    deletedAt: Date;

    @Column({ type: 'enum', enum: TimerStatus, default: TimerStatus.ACTIVE })
    status: TimerStatus;
    
}