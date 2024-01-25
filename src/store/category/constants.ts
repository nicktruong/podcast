import type { CategoryState } from "./interfaces";

export const initialState: CategoryState = {
  categories: [],
  fetchingCategories: false,
};

export const SLICE_NAME = "category";

export const FETCH_CATEGORIES_ACTION = `${SLICE_NAME}/fetchCategories`;
