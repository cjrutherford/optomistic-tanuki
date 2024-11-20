import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ScriptEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'longtext'})
    script: string;
}