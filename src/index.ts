import "reflect-metadata"
import express from "express";
import cors from "cors";
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { NotFound } from 'http-errors';
import { AppDataSource } from "./core/database";
import userRouter from "./users/user.router";
import postRouter from "./posts/post.router";
import commentRouter from "./comments/comment.router"
import * as resUtil from "./core/utils/res.util";
import * as dotenv from "dotenv";
import http from "http";
dotenv.config();

async function App() {
    const app = express();
    const port: number = parseInt(process.env.SERVER_PORT || '3004', 10);
    const server = http.createServer(app);
    // const io = socketIo(server);
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('tiny'));
    await AppDataSource.initialize().then(() => {
        console.log("Connecting database successfully");
    }).catch((error) => console.log(error))

    app.use('/users', userRouter);
    app.use('/posts', postRouter);
    app.use('/comments', commentRouter);

    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        return next(new NotFound('Route not found'))
    });
    app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        return resUtil.handleError(res, error);
    })
    app.listen(port, () => {
        console.log('Listening at port: ' + port);
    })
}
App();