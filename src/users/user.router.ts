import * as express from 'express';
import { Roles } from '../core/enum';
import {
    signup,
    signin,
} from './user.controller';
import { authorization } from '../core/middleware/auth.middleware';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

export default router;