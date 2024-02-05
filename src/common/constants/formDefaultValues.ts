import { Genders } from "../enums";

export const PODCAST_CREATION_DEFAULT_DATA = {
  title: "",
  category: "",
  description: "",
};

export const EPISODE_CREATION_DEFAULT_DATA = {
  title: "",
  description: "",
};

export const EDIT_PROFILE_DEFAULT_DATA = {
  bio: "",
  name: "",
  avatar: undefined,
};

export const REGISTRATION_INTERESTS_DEFAULT_DATA = {
  categoriesOfInterest: [],
};

export const LOGIN_DEFAULT_DATA = {
  email: "",
  password: "",
};

export const REGISTER_DEFAULT_DATA = {
  name: "",
  date: "",
  year: "",
  month: "",
  email: "",
  password: "",
  gender: "" as Genders,
  categoriesOfInterest: [],
};
