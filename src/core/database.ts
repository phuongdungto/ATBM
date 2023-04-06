import { DataSource } from "typeorm";
import * as path from "path";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from "dotenv";
import { User } from "../users/user.entity";
import { Post } from "../posts/post.entity";
import { Image } from "../images/image.entity";
import { Comment } from "../comments/comment.entity";
import { init1680718294116 } from "../migrations/1680718294116-init";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Post, Comment, Image],
    //entities: [path.resolve('src/**/*.entity.ts')],
    subscribers: [],
    migrations: [
        init1680718294116
    ],
    //migrations: [path.join(__dirname, "../migrations/*{.js,.ts}")],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
    logging: true
})