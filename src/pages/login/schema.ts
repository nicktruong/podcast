import Joi from "joi";

import { IUserLogin } from "@/common/interfaces";

const schema = Joi.object<IUserLogin>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(320)
    .required()
    .messages({
      "string.email":
        "This email is invalid. Make sure it's written like example@email.com",
      "string.empty":
        "This email is invalid. Make sure it's written like example@email.com",
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "The password must contain at least 8 characters, 1 number and 1 special character.",
    }),
});

export default schema;
