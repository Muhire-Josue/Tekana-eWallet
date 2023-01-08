import { celebrate, Joi } from 'celebrate';
export const createOneRule = celebrate({
  body: Joi.object().keys({
    amount: Joi.number().required(),
    type: Joi.string().valid('debit', 'credit').required(),
  }),
});
