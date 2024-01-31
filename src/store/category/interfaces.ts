import type { Categories } from "@/common/interfaces";

export interface CategoryState {
  categories: Categories;
  fetchingCategories: boolean;
}
