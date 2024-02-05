export interface CategoryDocData {
  categories: { name: string; imageUrl: string; color: string }[];
}

export type Categories = CategoryDocData["categories"];

export type Category = Categories[number];
