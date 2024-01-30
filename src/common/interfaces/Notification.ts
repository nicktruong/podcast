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
