import Joi from "joi";

import { MINIMUM_CATEGORY_SELECTION_ERROR_MESSAGE } from "@/common/constants";

import type { RegistrationInterests } from "@/common/interfaces";

const schema = Joi.object<RegistrationInterests>({
  categoriesOfInterest: Joi.array().items(Joi.string()).min(3).messages({
    "array.min": MINIMUM_CATEGORY_SELECTION_ERROR_MESSAGE,
  }),
});

export default schema;
