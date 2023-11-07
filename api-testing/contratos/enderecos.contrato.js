const Joi = require('joi');

const enderecoSchema = Joi.object({
  address_1: Joi.string().required(),
  address_2: Joi.string().required(),
  city: Joi.string().required(),
  createdAt: Joi.string().isoDate().required(),
  id: Joi.string().required(),
  state: Joi.string().required(),
  updatedAt: Joi.string().isoDate().required(),
  zip: Joi.number().required(),
});

const enderecosSchema = Joi.array().items(enderecoSchema);


module.exports = {
  validateAsync: async (data) => {
    try {
      return await enderecosSchema.validateAsync(data);
    } catch (error) {
      throw error;
    }
  },
};