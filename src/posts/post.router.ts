import * as express from 'express';
import { Roles } from '../core/enum';
import {
    createPost, getPosts, getPost
} from './post.controller';
import { authorization } from '../core/middleware/auth.middleware';
import { productImageUpload } from '../core/static/image.static';

const router = express.Router();

router.post('/', productImageUpload.array('images', 2), authorization(), createPost);
router.get('/', getPosts);
router.get('/:id', getPost)

export default router;