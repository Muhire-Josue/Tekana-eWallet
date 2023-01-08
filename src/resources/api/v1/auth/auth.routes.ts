import { Router } from 'express';
import { login, signUp, getMany } from './auth.controller';
import { registerRules, loginRules } from './auth.validator';
const router = Router();

router.post('/signup', registerRules, signUp);
router.post('/login', loginRules, login);
router.get('/users', getMany);

export default router;
