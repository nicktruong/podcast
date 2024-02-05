import Joi from "joi";

import type { LoginData } from "@/common/interfaces";

const schema = Joi.object<LoginData>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(320)
    .required()
    .messages({
      "string.email": "invalidMail",
      "string.empty": "invalidMail",
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required()
    .messages({
      "string.empty": "invalidPassword",
      "string.pattern.base": "invalidPassword",
    }),
});

export default schema;
