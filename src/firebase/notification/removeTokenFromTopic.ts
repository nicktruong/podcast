import { instance } from "@/config";

import type { TokenTopicPair } from "@/common/interfaces";

export const removeTokenFromTopic = async ({
  topic,
  token,
}: TokenTopicPair) => {
  await instance.post("https://iid.googleapis.com/iid/v1:batchRemove", {
    to: `/topics/${topic}`,
    registration_tokens: [token],
  });
};
