import { GENDERS, ROLES } from "@/common/enums";

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
