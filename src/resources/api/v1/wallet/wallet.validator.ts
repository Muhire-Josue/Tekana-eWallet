import { celebrate, Joi } from 'celebrate';
export const createOneRule = celebrate({
  body: Joi.object().keys({
    balance: Joi.number().required(),
  }),
});
export const getOneRule = celebrate({
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
});
