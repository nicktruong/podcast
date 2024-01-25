import type { Category } from "@/common/interfaces";

export interface CategoryState {
  categories: Category;
  fetchingCategories: boolean;
}
