import Joi from 'joi';

export const signInSchema = Joi.object().keys({
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().label('Password'),
});

export const signUpSchema = Joi.object().keys({
  name: Joi.string().min(3).max(120).label('User name'),
  email: Joi.string().email().required().label('Email'),
  phone: Joi.string().regex(/^\+375\((17|25|29|33|44)\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/).label('Phone number'),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().label('Password'),
  rePassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    .valid(Joi.ref('password')).required()
    .options({ language: { any: { allowOnly: 'Passwords must match' } } })
    .label('Repeat password'),
});

export const updateUserProfileSchema = Joi.object().keys({
  name: Joi.string().min(3).max(120).required()
    .label('User name'),
  phone: Joi.string().regex(/^\+375\((17|25|29|33|44)\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/)
    .label('Phone number'),
  passwordToggleIsOpen: Joi.boolean().required(),
  password: Joi.when('passwordToggleIsOpen', { is: true, then: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).label('Password') }),
});

export const createPlaygroundSchema = Joi.object().keys({
  name: Joi.string().min(6).max(120).required()
    .label('Playground title'),
  address: Joi.string().min(5).max(100).required()
    .label('Playground address'),
  description: Joi.string().min(5).max(600).required()
    .label('Playground description'),
});

export const createEventSchema = Joi.object().keys({
  title: Joi.string().min(6).max(120).required()
    .label('Event title'),
  datetime: Joi.date().required()
    .label('Event date'),
  playgroundId: Joi.number().min(1).required()
    .label('Event playground'),
});
