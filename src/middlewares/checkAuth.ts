import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jsonResponse from 'helpers/jsonResponse';
import * as statusCodes from '../constants/statusCodes';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const { JWT_KEY = '' } = process.env;
  const bearerHeader = req.headers.authorization;
  if (bearerHeader === undefined) {
    return jsonResponse({
      res,
      status: statusCodes.UNAUTHORIZED,
      error: 'Unauthorized access',
    });
  }
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  req.token = bearerToken;
  return jwt.verify(req.token, JWT_KEY, (error, data) => {
    if (error) {
      return jsonResponse({
        res,
        status: statusCodes.UNAUTHORIZED,
        error: 'Unauthorized access',
      });
    }
    req.currentUser = data;
    return next();
  });
};

export default checkAuth;
