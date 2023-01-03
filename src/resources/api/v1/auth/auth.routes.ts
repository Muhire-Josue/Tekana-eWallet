import { Router } from 'express';
import { login, signUp } from './auth.controller';
import { registerRules, loginRules } from './auth.validator';
const router = Router();

router.post('/signup', registerRules, signUp);
router.post('/login', loginRules, login);

export default router;
