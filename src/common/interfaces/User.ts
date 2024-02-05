import type { Roles, Genders } from "@/common/enums";

export interface User {
  id: string;
  bio: string;
  dob: string;
  name: string;
  email: string;
  roles: Roles[];
  gender: Genders;
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
  userId: string;
  bio?: string;
  fullPath?: string;
}

export interface EditProfile {
  bio: string;
  name: string;
  userId: string;
  avatar: File | undefined;
}

export interface UserCreationData {
  role: Roles;
  name: string;
  email: string;
  gender: Genders;
  photoURL: string;
  categoriesOfInterest: string[];
  dob?: Date;
  uid?: string;
}
