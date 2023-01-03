import { celebrate, Joi } from 'celebrate';

export const registerRules = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
  }),
});

export const loginRules = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
  }),
});
