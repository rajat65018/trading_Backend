const Joi = requrie('joi');

const updateJoiSchema = Joi.object({
    name: Joi.string().requried(),
    address: Joi.string().requried()
});

module.exports = updateJoiSchema;