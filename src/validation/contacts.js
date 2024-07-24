import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).trim().required(),
  phoneNumber: Joi.string()
    .regex(/^[\+][0-9]{12}$/)
    .min(3)
    .max(20)
    .required(),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .min(3)
    .max(20)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).trim(),
  phoneNumber: Joi.string()
    .regex(/^[\+][0-9]{12}$/)
    .min(3)
    .max(20),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(20),
});
