import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least {#limit} characters',
    'string.max': 'Name must be at most {#limit} characters',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string()
    .regex(/^[\+][0-9]{12}$/)
    .required()
    .messages({
      'string.base': 'phoneNumber must be a string',
      'string.pattern.base': 'phoneNumber must be in +380xx0000000 format',
      'string.empty': 'phoneNumber cannot be empty',
      'any.required': 'phoneNumber is required',
    }),
  email: Joi.string().email().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'contactType must be a string',
      'any.only': 'contactType must be one of [work, home, personal]',
      'string.empty': 'contactType cannot be empty',
      'any.required': 'contactType is required',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least {#limit} characters',
    'string.max': 'Name must be at most {#limit} characters',
    'string.empty': 'Name cannot be empty',
  }),
  phoneNumber: Joi.string()
    .regex(/^[\+][0-9]{12}$/)
    .messages({
      'string.base': 'phoneNumber must be a string',
      'string.pattern.base': 'phoneNumber must be in +380xx0000000 format',
      'string.empty': 'phoneNumber cannot be empty',
    }),
  email: Joi.string().email().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'contactType must be a string',
    'any.only': 'contactType must be one of [work, home, personal]',
    'string.empty': 'contactType cannot be empty',
  }),
});
