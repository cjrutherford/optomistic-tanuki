import { DataSource } from "typeorm";
import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';
import { Profile } from "../profiles/entities/profile.entity";
import { Project } from "../projects/entities/project.entity";
import { Goal } from "../goals/entities/goal.entity";
import { Timeline } from "../timelines/entities/timeline.entity";

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

const entities = [Profile, Project, Goal, Timeline];

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