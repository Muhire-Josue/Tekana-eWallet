import { Router } from 'express';
import { createOne, getOne } from './wallet.controller';
import checkAuth from '../../../../middlewares/checkAuth';
import { createOneRule, getOneRule } from './wallet.validator';
import { checkUserExist } from '../../../../middlewares/checkUser';
const router = Router();

router.post('/', createOneRule, checkAuth, checkUserExist, createOne);
router.get('/:id', getOneRule, checkAuth, checkUserExist, getOne);

export default router;
