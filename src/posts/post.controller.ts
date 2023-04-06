import * as Joi from "joi";
import { Request, Response, NextFunction } from 'express';
import { validate } from "../core/utils/validate.util";
import * as postService from "./post.service";
// import { AddUserProjectDTO, AddUserTaskDTO, CreateUserDTO, LoginDTO } from "./user.dto";
import { Roles } from "../core/enum";
import { pagination } from "../core/interfaces/pagination.interface";

export async function createPost(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            content: Joi.string().required(),
            images: Joi.array().max(10),
        })
        const { images, content } = validate({
            ...req.body,
            images: Array.isArray(req.files) && req.files.map(file => file.filename)
        }, schema);

        const result = await postService.createPost(images, content, req.user);
        return res.status(201).send(result);
    } catch (error) {
        return next(error);
    }
}

export async function getPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            page: Joi.number().default(1).min(1),
            limit: Joi.number().default(5).max(10),
            sort: Joi.string().allow(''),
            sortBy: Joi.string().valid(...Object.values(['asc', 'desc'])).allow('')
        })
        const value = validate<pagination>(req.query, schema);

        const result = await postService.getPosts(value);
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}

export async function getPost(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await postService.getPost(+req.params.id);
        return res.status(200).send(result);
    } catch (error) {
        return next(error);
    }
}
