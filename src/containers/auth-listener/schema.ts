import Joi from "joi";

import { OAuthRegisterCategories } from "@/common/interfaces/OAuthRegisterCategories";

const schema = Joi.object<OAuthRegisterCategories>({
  categoriesOfInterest: Joi.array().items(Joi.string()).min(3),
});

export default schema;
