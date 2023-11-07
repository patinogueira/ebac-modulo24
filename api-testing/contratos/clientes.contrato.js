const Joi = require('joi');

const enderecoSchema = Joi.object({
  id: Joi.string().required(),
});

const clienteSchema = Joi.object({
  address: enderecoSchema.required(),
  createdAt: Joi.string().isoDate().required(),
  email: Joi.string().required(),
  firstName: Joi.string().required(),
  id: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  updatedAt: Joi.string().isoDate().required(),
});

module.exports = {
  validateAsync: async (data) => {
    try {
      return await Joi.array().items(clienteSchema).validateAsync(data);
    } catch (error) {
      throw error;
    }
  },
};