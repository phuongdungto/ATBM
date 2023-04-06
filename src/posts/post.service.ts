import { Pagination } from "../core/utils/pagination.util";
import { AppDataSource } from '../core/database';
import { BadRequest, Unauthorized, NotFound } from 'http-errors';
import { Post } from './post.entity';
import { Image } from '../images/image.entity';

const postRepo = AppDataSource.getRepository(Post);

export async function createPost(images: any, content: string, user: any) {
    const post = {
        content: content,
        userId: user.id
    }
    const newPost = new Post(post);

    await postRepo.save(newPost);
    const gets = images.map(img => (
        {
            name: img,
            postId: newPost.id
        }
    ))
    console.log(gets);
    await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Image)
        .values(gets)
        .execute()
}

export async function getPosts(req) {
    const query = Pagination(Post, req);
    const [list, count] = await postRepo.findAndCount({
        ...query,
        relations: {
            images: true
        }
    })
    return { totalPage: Math.ceil(count / req.limit), posts: list }
}

export async function getPost(id: number) {
    const post = await postRepo.findOne({
        where: { id: id },
        relations: {
            images: true,
            comments: true
        }
    })
    if (!post) {
        throw new NotFound('Post not found')
    }
    return post;
}