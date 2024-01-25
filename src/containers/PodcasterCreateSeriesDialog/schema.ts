import Joi from "joi";

import type { PodcastCreationData } from "@/common/interfaces";

const schema = Joi.object<PodcastCreationData>({
  title: Joi.string().max(100).required().messages({}),
  category: Joi.string().required().max(50).messages({}),
  description: Joi.string().max(600).required().messages({}),
});

export default schema;
