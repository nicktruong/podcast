export interface Notification {
  title: string;
  readIds: string[]; // Users already read this message
  userIds: string[];
  createdAt: string;
  creatorName: string;
  creatorAvatar: string;
}

export interface UserNotification {
  id: string;
  read: boolean;
  title: string;
  createdAt: string;
  creatorName: string;
  creatorAvatar: string;
}

export interface NotificationData {
  action: string;
  subject: string;
  createdAt: string;
  creatorName: string;
  creatorAvatar: string;
}

export interface UserNotificationsIds {
  userId: string;
  notificationIds: string[];
}

export interface NotifyFollowerOptions {
  podcastId: string;
  creatorName: string;
  episodeName: string;
  podcastName: string;
  creatorAvatar: string;
}

export interface TokenTopicPair {
  topic: string;
  token: string;
}

export interface SendNotificationOptions {
  topic: string;
  action: string;
  subject: string;
  createdAt: string;
  creatorName: string;
  creatorAvatar: string;
}
