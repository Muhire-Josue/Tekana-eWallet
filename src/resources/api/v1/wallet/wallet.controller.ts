import { Request, Response } from 'express';
import jsonResponse from 'helpers/jsonResponse';
import Wallet from '../../../../database/models/wallet';
import * as statusCodes from '../../../../constants/statusCodes';
import asyncHandler from 'middlewares/asyncHandler';

export const createOne = asyncHandler(async (req: Request, res: Response) => {
  const { currentUser } = req;
  const formData = req.body;
  const foundWallet = await Wallet.findOne({ where: { user_id: currentUser.id } });
  if (foundWallet) {
    return jsonResponse({
      res,
      status: statusCodes.CONFLICT,
      error: 'Wallet already exist!',
    });
  }
  formData.user_id = currentUser.id;
  const data = await Wallet.create(formData);
  return jsonResponse({
    res,
    status: statusCodes.CREATED,
    message: 'Wallet created!',
    data,
  });
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const wallet = await Wallet.findOne({ where: { id } });
  if (!wallet) {
    return jsonResponse({
      res,
      status: statusCodes.NOT_FOUND,
      error: 'No data found',
    });
  }
  if (wallet.user_id !== req.currentUser?.id) {
    return jsonResponse({
      res,
      status: statusCodes.UNAUTHORIZED,
      error: 'Unauthorized access',
    });
  }
  return jsonResponse({
    res,
    status: statusCodes.OK,
    message: 'User wallet',
    data: wallet,
  });
});
