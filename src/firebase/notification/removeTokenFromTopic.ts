import { instance } from "@/config";

export const removeTokenFromTopic = async ({
  topic,
  token,
}: {
  topic: string;
  token: string;
}) => {
  await instance.post("https://iid.googleapis.com/iid/v1:batchRemove", {
    to: `/topics/${topic}`,
    registration_tokens: [token],
  });
};
