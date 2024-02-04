import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().max(100).required().messages({}),
  category: Joi.string().max(50).required().messages({}),
  description: Joi.string().max(600).required().messages({}),
});

export default schema;
