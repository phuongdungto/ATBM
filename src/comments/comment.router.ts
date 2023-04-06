import * as express from 'express';
import { Roles } from '../core/enum';
import {
    createComment, getComments
} from './comment.controller';
import { authorization } from '../core/middleware/auth.middleware';

const router = express.Router();

router.post('/', authorization(), createComment);
router.get('/', getComments);

export default router;