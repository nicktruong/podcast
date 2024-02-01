import { instance } from "@/config";

import type { TokenTopicPair } from "@/common/interfaces";

export const subscribeTokenToTopic = async ({
  token,
  topic,
}: TokenTopicPair) => {
  await instance.post(
    `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`
  );
};
