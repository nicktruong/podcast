import { GENDERS } from "../enums";

export interface RegistrationInterests {
  categoriesOfInterest: string[];
}

export interface RegisterData extends RegistrationInterests {
  name: string;
  date: string;
  year: string;
  email: string;
  month: string;
  gender: GENDERS;
  password: string;
}
