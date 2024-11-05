import { DataSource } from "typeorm";
import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';
import { Post } from "../entities/post.entity";
import { Vote } from "../entities/vote.entity";
import { Comment } from "../entities/comment.entity";
import { Attachment } from "../entities/attachment.entity";
import { Link } from "../entities/link.entity";

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

const entities = [Post, Vote, Comment, Attachment, Link];

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