import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum NoteStatus {
    Draft = 'draft',
    Published = 'published',
    Archived = 'archived',
    Deleted = 'deleted',
    Public = 'public',
}

@Entity()
export class NoteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column({ nullable: true })
    projectId: string;

    @Column({ nullable: true })
    taskId: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'longtext'})
    contents: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column({ type: 'enum', enum: NoteStatus, default: NoteStatus.Draft })
    status: NoteStatus;
}