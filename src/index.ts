import "reflect-metadata"
import * as express from "express";
import * as cors from "cors";
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { NotFound } from 'http-errors';
import { AppDataSource } from "./core/database";
import * as resUtil from "./core/utils/res.util";
import * as dotenv from "dotenv";
dotenv.config();

async function App() {
    const app = express();
    const port: number = parseInt(process.env.SERVER_PORT || '3004', 10);

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('tiny'));
    await AppDataSource.initialize().then(() => {
        console.log("Connecting database successfully");
    }).catch((error) => console.log(error))



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