import { Router } from 'express';
import { createOne, getOne, getMany } from './transaction.controller';
import checkAuth from '../../../../middlewares/checkAuth';
import { createOneRule } from './transaction.validator';
import { getOneRule } from '../wallet/wallet.validator';
import { checkUserExist } from '../../../../middlewares/checkUser';
const router = Router();

router.post('/', createOneRule, checkAuth, checkUserExist, createOne);
router.get('/', checkAuth, checkUserExist, getMany);
router.get('/:id', getOneRule, checkAuth, checkUserExist, getOne);

export default router;
