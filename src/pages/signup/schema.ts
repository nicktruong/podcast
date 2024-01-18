import Joi from "joi";

import { genders } from "@/common/constants";
import { getNumberOfDaysInMonth } from "@/common/utils/dateHelpers";

export interface IRegisterForm {
  name: string;
  date: string;
  year: string;
  email: string;
  month: string;
  gender: string;
  password: string;
}

const schema = Joi.object<IRegisterForm>({
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
  gender: Joi.string().valid(...genders.map((gender) => gender.value)),
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

      if (value <= 0 || value > getNumberOfDaysInMonth(month, year)) {
        return helper.error("dob.date.range");
      }

      return true;
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

      return true;
    })
    .messages({
      "dob.year": "Year must be a number",
      "dob.year.range": "Please choose a valid year (after 1907)",
    }),
});

export default schema;
