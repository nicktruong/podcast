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
  emailVerified: boolean;
  episodeCount: null | number;
  categoriesOfInterest: string[];
}
