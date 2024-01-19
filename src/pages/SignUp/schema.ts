import Joi from "joi";

import { Genders } from "@/common/enums";
import { getNumberOfDaysInMonth } from "@/common/utils";

import type { RegisterData } from "@/common/interfaces";

const schema = Joi.object<RegisterData>({
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
      "string.pattern.base": "Password must pass the below criteria",
    }),
  name: Joi.string().required(),
  gender: Joi.string().valid(...Object.keys(Genders)),
  date: Joi.number()
    .custom((value, helper) => {
      value = +value;
      // get month and year to validate if date is correct
      // E.g. April has 30 days,...
      const month = helper.state.ancestors?.[0]?.month ?? 0;
      const year = helper.state.ancestors?.[0]?.year ?? 1970;

      if (isNaN(value)) {
        return helper.error("dob.date");
      }

      if (value <= 0 || value > getNumberOfDaysInMonth({ month, year })) {
        return helper.error("dob.date.range");
      }

      return value;
    })
    .messages({
      "dob.date": "Date must be a number",
      "dob.date.range": "Please choose a valid date",
    }),
  month: Joi.number().required(),
  year: Joi.number()
    .custom((value, helper) => {
      value = +value;

      if (isNaN(value)) {
        return helper.error("dob.year");
      }

      if (value < 1907 || value > new Date().getFullYear()) {
        return helper.error("dob.year.range");
      }

      return value;
    })
    .messages({
      "dob.year": "Year must be a number",
      "dob.year.range": "Please choose a valid year (after 1907)",
    }),
  categoriesOfInterest: Joi.array().items(Joi.string()).min(3),
});

export default schema;
