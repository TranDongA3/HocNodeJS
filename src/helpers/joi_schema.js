import Joi from "joi";

export const email = Joi.string().pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")).required();
export const password = Joi.string().min(6).required();
export const title = Joi.string().required();
export const price = Joi.number().min(0).required();
export const available = Joi.number().min(0).required();
export const categoryId = Joi.string().uppercase().alphanum().required();
export const image = Joi.string().required();
export const bid =Joi.string().required()
export const bids =Joi.array().required()


