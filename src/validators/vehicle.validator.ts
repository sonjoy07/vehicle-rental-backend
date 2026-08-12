import Joi from 'joi';
export const createVehicleSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'any.required': 'Name is required field', 'string.empty': 'Name cannot be blank' }),
  plate_number: Joi.string().required().messages({
    'any.required': 'Plate Number is required field',
    'string.empty': 'Plate Number cannot be blank',
  }),
  category: Joi.string().required().messages({
    'any.required': 'Category Number is required field',
    'string.empty': 'Category cannot be blank',
  }),
  daily_rate: Joi.number().positive().required().messages({
    'any.required': 'Daily Rate is required field',
    'string.empty': 'Daily Rate cannot be blank',
  }),
});
export const updateVehicleSchema = Joi.object({
  name: Joi.string(),
  plate_number: Joi.string(),
  category: Joi.string(),
  daily_rate: Joi.number().positive(),
}).min(1);
