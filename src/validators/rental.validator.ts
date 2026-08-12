import Joi from "joi";
export const createRentalSchema = Joi.object({
    vehicle_id: Joi.number().integer().positive().required()
        .messages({ 'any.required': 'Vehicle is required field', 'string.empty': "Vehicle cannot be blank" }),
    customer_name: Joi.string()
        .required()
        .messages({ 'any.required': 'Customer Name is required field', 'string.empty': "Customer Name cannot be blank" }),
    customer_phone: Joi.string()
        .required()
        .messages({ 'any.required': 'Customer Phone is required field', 'string.empty': "Customer phone cannot be blank" }),
    start_date: Joi.date().iso()
        .required()
        .messages({ 'any.required': 'Start Date is required field', 'string.empty': "Start Date cannot be blank" }),
    end_date: Joi.date().iso()
        .required()
        .messages({ 'any.required': 'Start Date is required field', 'string.empty': "End Date cannot be blank" }),
})
export const updateRentalSchema = Joi.object({
    customer_name: Joi.string(),
    customer_phone: Joi.string(),
    start_date: Joi.date().iso(),
    end_date: Joi.date().iso(),
    status: Joi.string().valid('booked', 'ongoing', 'completed', 'cancelled'),
}).min(1)