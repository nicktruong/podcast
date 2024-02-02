import { instance } from "@/config";

import type { SendNotificationOptions } from "@/common/interfaces";

export const sendNotification = async ({
  id,
  topic,
  action,
  subject,
  createdAt,
  creatorName,
  creatorAvatar,
}: SendNotificationOptions) => {
  await instance.post("https://fcm.googleapis.com/fcm/send", {
    to: `/topics/${topic}`,
    data: {
      id,
      action,
      subject,
      createdAt,
      creatorName,
      creatorAvatar,
    },
  });
};
