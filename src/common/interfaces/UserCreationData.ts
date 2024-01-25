import { ROLES } from "@/common/enums";

export interface UserCreationData {
  dob?: Date;
  role: ROLES;
  uid?: string;
  name: string;
  email: string;
  gender?: string;
  photoURL?: string;
  categoriesOfInterest: string[];
}
