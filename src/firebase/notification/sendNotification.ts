import { instance } from "@/config";

export const sendNotification = async ({
  topic,
  action,
  subject,
  createdAt,
  creatorName,
  creatorAvatar,
}: {
  topic: string;
  action: string;
  subject: string;
  createdAt: string;
  creatorName: string;
  creatorAvatar: string;
}) => {
  await instance.post("https://fcm.googleapis.com/fcm/send", {
    to: `/topics/${topic}`,
    data: {
      action,
      subject,
      createdAt,
      creatorName,
      creatorAvatar,
    },
  });
};
