import { DataSource } from "typeorm";
import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';
import { NoteEntity, TaskEntity, TimerEntity } from "./entities";

const config = yaml.load(fs.readFileSync(path.resolve('config.yaml'), 'utf8')) as Record<string, any>;
// console.log("🚀 ~ config:", config)
const { database: {
    host,
    port,
    user,
    password,
    name,
    database
}} = config;

const entities = [TaskEntity, NoteEntity, TimerEntity];

const staticSource =  new DataSource({
    type: 'postgres', 
    host: host,
    port: Number(port),
    username: user,
    password,
    database: database,
    entities,
    migrations: ['migrations/*.ts'],
}); 
// console.log("🚀 ~ staticSource:", staticSource)
export default staticSource