import { Request, Response, NextFunction } from 'express';
import jsonResponse from 'helpers/jsonResponse';
import * as statusCodes from '../constants/statusCodes';
import User from '../database/models/user';

export const checkUserExist = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.currentUser?.id;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return jsonResponse({
      res,
      status: statusCodes.NOT_FOUND,
      error: 'User not found!',
    });
  }
  return next();
};
