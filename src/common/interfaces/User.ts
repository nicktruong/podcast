import type { ROLES, GENDERS } from "@/common/enums";

export interface User {
  id: string;
  bio: string;
  dob: string;
  name: string;
  email: string;
  roles: ROLES[];
  gender: GENDERS;
  photoURL: string;
  history: string[];
  createdAt: string;
  updatedAt: string;
  following: string[]; // list of podcast ids
  episodeCount: number;
  emailVerified: boolean;
  categoriesOfInterest: string[];
}

export interface PodcastUserIdPair {
  userId: string;
  podcastId: string;
}

export interface UserEditProfileOptions {
  name: string;
  bio?: string;
  userId: string;
  fullPath?: string;
}

export interface EditProfile {
  bio: string;
  name: string;
  userId: string;
  avatar: File | undefined;
}

export interface UserCreationData {
  dob?: Date;
  role: ROLES;
  uid?: string;
  name: string;
  email: string;
  gender: GENDERS;
  photoURL: string;
  categoriesOfInterest: string[];
}
