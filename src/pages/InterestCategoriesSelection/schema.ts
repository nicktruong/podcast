import Joi from "joi";

import type { RegistrationInterests } from "@/common/interfaces";

const schema = Joi.object<RegistrationInterests>({
  categoriesOfInterest: Joi.array().items(Joi.string()).min(3).messages({
    "array.min": "Please choose at least 3 categories of interest",
  }),
});

export default schema;
