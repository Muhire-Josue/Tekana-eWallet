import { Request, Response } from 'express';
import 'dotenv';
import jsonResponse from 'helpers/jsonResponse';
import bcrypt from 'bcrypt';
import asyncHandler from 'middlewares/asyncHandler';
import User from '../../../../database/models/user';
import * as statusCodes from '../../../../constants/statusCodes';
import jwt from 'jsonwebtoken';

const { SALT_ROUNDS, JWT_SECRET_KEY } = process.env;
export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const formData = req.body;
  const emailExist = await User.findOne({ where: { email: formData.email } });
  if (emailExist) {
    return jsonResponse({
      res,
      status: statusCodes.CONFLICT,
      error: 'Email already exists!',
    });
  }
  const salt = await bcrypt.genSalt(parseInt(SALT_ROUNDS) || 10);
  formData.password = await bcrypt.hash(req.body.password, salt);
  const user = await User.create(formData);
  const data = { id: user.id, email: user.email, name: user.name };
  const token = jwt.sign(data, JWT_SECRET_KEY || '');
  return jsonResponse({
    res,
    status: statusCodes.OK,
    message: 'User Created!',
    data,
    token,
  });
});
