import { Roles } from "@/common/constants/roles";

export interface CreateUserDoc {
  dob?: Date;
  role: Roles;
  uid?: string;
  name: string;
  email: string;
  gender?: string;
  categoriesOfInterest: string[];
}
