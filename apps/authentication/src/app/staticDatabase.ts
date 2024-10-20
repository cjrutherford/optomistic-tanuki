import { DataSource } from "typeorm";
import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';
import { KeyDatum } from "../key-data/entities/key-datum.entity";
import { TokenEntity } from "../tokens/entities/token.entity";
import { UserEntity } from "../user/entities/user.entity";

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

const entities = [KeyDatum, UserEntity, TokenEntity];

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