import { Router } from 'express';
import { signUp } from './auth.controller';
import { registerRules } from './auth.validator';
const router = Router();

router.post('/signup', registerRules, signUp);

export default router;
