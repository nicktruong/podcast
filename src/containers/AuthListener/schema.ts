import Joi from "joi";

import type { RegistrationInterests } from "@/common/interfaces";

const schema = Joi.object<RegistrationInterests>({
  categoriesOfInterest: Joi.array().items(Joi.string()).min(3),
});

export default schema;
