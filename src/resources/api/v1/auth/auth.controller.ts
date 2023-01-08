import { Request, Response } from 'express';
import 'dotenv';
import jwt from 'jsonwebtoken';
import jsonResponse from 'helpers/jsonResponse';
import bcrypt from 'bcrypt';
import asyncHandler from 'middlewares/asyncHandler';
import User from '../../../../database/models/user';
import * as statusCodes from '../../../../constants/statusCodes';
import { comparePassword } from 'helpers/authHelper';

const { SALT_ROUNDS, JWT_KEY } = process.env;
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
  const token = jwt.sign(data, JWT_KEY || '');
  return jsonResponse({
    res,
    status: statusCodes.CREATED,
    message: 'User Created!',
    data,
    token,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const formData = req.body;
  const user = await User.findOne({ where: { email: formData.email } });
  if (!comparePassword(formData.password, user?.password)) {
    return jsonResponse({
      res,
      status: statusCodes.NOT_FOUND,
      error: 'User not found!',
    });
  }
  const data = { id: user?.id, email: user?.email, name: user?.name };
  const token = jwt.sign(data, JWT_KEY || '');
  return jsonResponse({
    res,
    status: statusCodes.OK,
    message: 'User Found!',
    data,
    token,
  });
});

export const getMany = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findAll({
    attributes: ['id', 'name', 'email', 'created_at', 'updated_at'],
  });
  return jsonResponse({
    res,
    status: statusCodes.OK,
    message: 'User Found!',
    data: user,
  });
});
