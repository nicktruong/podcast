import { Roles, Genders } from "../enums";

export interface UserFirebase {
  email: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface User {
  id: string;
  dob: string; // ISOString
  name: string;
  roles: Roles[];
  gender: Genders;
  history: string[];
  categoriesOfInterest: string[];
}

export type UserInfo = UserFirebase & User;
