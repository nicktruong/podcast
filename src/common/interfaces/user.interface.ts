import { Genders } from "../constants/genders";
import { Roles } from "../constants/roles";

export interface UserFirebase {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
  emailVerified: boolean;
}

export interface User {
  roles: Roles[];
  dob: string; // ISOString
  name: string;
  gender: Genders;
}
