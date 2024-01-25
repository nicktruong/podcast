import Joi from "joi";

import { EditProfile } from "@/common/interfaces/EditProfile";

const schema = Joi.object<EditProfile>({
  bio: Joi.string().allow("").optional(),
  avatar: Joi.object().optional(),
  name: Joi.string().required(),
});

export default schema;
