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
  dob: string; // ISOString
  name: string;
  roles: Roles[];
  gender: Genders;
}

export type UserInfo = UserFirebase & User;
