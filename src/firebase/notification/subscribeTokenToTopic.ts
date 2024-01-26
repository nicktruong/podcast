import { instance } from "@/config";

export const subscribeTokenToTopic = async ({
  token,
  topic,
}: {
  token: string;
  topic: string;
}) => {
  await instance.post(
    `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`
  );
};
