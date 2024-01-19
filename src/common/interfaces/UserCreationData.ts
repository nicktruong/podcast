import { Roles } from "@/common/enums";

export interface UserCreationData {
  dob?: Date;
  role: Roles;
  uid?: string;
  name: string;
  email: string;
  gender?: string;
  categoriesOfInterest: string[];
}
