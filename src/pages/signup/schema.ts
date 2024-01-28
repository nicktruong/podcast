import Joi from "joi";

import { GENDERS } from "@/common/enums";
import { getNumberOfDaysInMonth } from "@/common/utils";

import type { RegisterData } from "@/common/interfaces";

const schema = Joi.object<RegisterData>({
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
      "string.empty": "passwordMustPassCriteria",
      "string.pattern.base": "passwordMustPassCriteria",
    }),
  name: Joi.string().required().messages({
    "string.empty": "invalidName",
  }),
  gender: Joi.string()
    .valid(...Object.keys(GENDERS))
    .messages({
      "any.only": "pleaseChooseGender",
    }),
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
      "dob.date": "dateMustBeNumber",
      "number.base": "dateMustBeNumber",
      "dob.date.range": "invalidDate",
    }),
  month: Joi.number().required().messages({
    "any.required": "monthMustBeNumber",
    "number.base": "monthMustBeNumber",
  }),
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
      "dob.year": "yearMustBeNumber",
      "number.base": "yearMustBeNumber",
      "dob.year.range": "invalidYear",
    }),
  categoriesOfInterest: Joi.array().items(Joi.string()).min(3),
});

export default schema;
