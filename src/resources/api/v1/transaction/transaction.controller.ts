import { Request, Response } from 'express';
import jsonResponse from 'helpers/jsonResponse';
import Wallet from '../../../../database/models/wallet';
import Transaction from '../../../../database/models/transaction';
import * as statusCodes from '../../../../constants/statusCodes';
import asyncHandler from 'middlewares/asyncHandler';

export const createOne = asyncHandler(async (req: Request, res: Response) => {
  const { currentUser } = req;
  const formData = req.body;
  const foundWallet = await Wallet.findOne({ where: { user_id: currentUser.id } });
  if (!foundWallet) {
    return jsonResponse({
      res,
      status: statusCodes.NOT_FOUND,
      error: 'Wallet not found',
    });
  }
  if (foundWallet.balance < formData.amount) {
    return jsonResponse({
      res,
      status: statusCodes.BAD_REQUEST,
      error: 'Insufficient balance!',
    });
  }
  if (formData.type === 'debit') {
    await foundWallet.update({ balance: foundWallet.balance - formData.amount });
  } else {
    await foundWallet.update({ balance: foundWallet.balance + formData.amount });
  }
  formData.user_id = currentUser.id;
  const data = await Transaction.create(formData);
  return jsonResponse({
    res,
    status: statusCodes.CREATED,
    message: 'transaction created!',
    data,
  });
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const transaction = await Wallet.findOne({ where: { id } });
  if (!transaction) {
    return jsonResponse({
      res,
      status: statusCodes.NOT_FOUND,
      error: 'Transaction not found',
    });
  }
  if (transaction.user_id !== req.currentUser?.id) {
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
    data: transaction,
  });
});

export const getMany = asyncHandler(async (req: Request, res: Response) => {
  const transactions = await Transaction.findAll({ where: { user_id: req.currentUser?.id } });
  if (transactions.length < 1) {
    return jsonResponse({
      res,
      status: statusCodes.NOT_FOUND,
      error: 'Transactions not found',
    });
  }
  return jsonResponse({
    res,
    status: statusCodes.OK,
    message: 'User wallet',
    data: transactions,
  });
});
