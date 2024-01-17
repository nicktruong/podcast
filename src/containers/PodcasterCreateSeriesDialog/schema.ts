import Joi from "joi";

import { CreatePodcastSeries } from "@/common/interfaces/CreatePodcastSeries";

const schema = Joi.object<CreatePodcastSeries>({
  title: Joi.string().max(100).required().messages({}),
  category: Joi.string().required().max(50).messages({}),
  description: Joi.string().max(600).required().messages({}),
});

export default schema;
