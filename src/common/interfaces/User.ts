import { ROLES, GENDERS } from "@/common/enums";

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
  following: string[]; // list of podcasts
  episodeCount: number;
  emailVerified: boolean;
  categoriesOfInterest: string[];
}
