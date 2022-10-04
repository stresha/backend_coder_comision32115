import joi from "joi"

const product = joi.object({
    name: joi.string().min(3).max(45).required(),
    description: joi.string().min(5).max(200).required(),
    code: joi.string().min(3).max(8).required(),
    img: joi.string().min(3).max(200).required(),
    price: joi.number().required(),
    stock: joi.number().required(),
})

export const joiValidator ={ product,}