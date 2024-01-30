import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
  avatar: Joi.object().optional(),
  bio: Joi.string().allow("").optional(),
});

export default schema;
