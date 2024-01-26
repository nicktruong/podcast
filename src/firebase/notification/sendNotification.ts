import { instance } from "@/config";

export const sendNotification = async ({ topic }: { topic: string }) => {
  await instance.post(
    "https://fcm.googleapis.com/v1/projects/podcast-185c3/messages:send",
    {
      message: {
        topic,
        notification: {
          title: "Breaking News",
          body: "New news story available.",
        },
        data: {
          story_id: "story_12345",
        },
      },
    }
  );
};
