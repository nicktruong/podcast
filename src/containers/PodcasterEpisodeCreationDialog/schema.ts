import Joi from "joi";

import type { EpisodeBasicCreationData } from "@/common/interfaces";

const schema = Joi.object<EpisodeBasicCreationData>({
  title: Joi.string().max(200).required().messages({}),
  description: Joi.string().max(4000).required().messages({}),
});

export default schema;
