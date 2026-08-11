import Joi from "joi";
export const signupSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({ 'any.required': 'Name is required field', 'string.empty': "Name cannot be blank" }),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }).required()
        .messages({
            'string.email': 'Please provide a valid email address.',
            'any.required': 'Email is required.'
        }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        .messages({
            'string.pattern.base': 'Password must be 8-30 characters long, containing at least one uppercase letter, one lowercase letter, and one number.',
            'any.required': 'Password is required.'
        }),

    repeat_password: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords do not match.',
            'any.required': 'Confirm password field is required.'
        }),
})

export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address.',
            'any.required': 'Email is required.'
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.pattern.base': 'Password must be 8-30 characters long, containing at least one uppercase letter, one lowercase letter, and one number.',
            'any.required': 'Password is required.'
        })
})