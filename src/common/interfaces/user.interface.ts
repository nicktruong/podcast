import { Roles } from "../constants/roles";
import { Genders } from "../constants/genders";

export interface UserFirebase {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
  emailVerified: boolean;
}

export interface User {
  id: string;
  dob: string; // ISOString
  name: string;
  roles: Roles[];
  gender: Genders;
  categoriesOfInterest: string[];
}

export type UserInfo = UserFirebase & User;
