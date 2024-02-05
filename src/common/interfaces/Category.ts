export interface CategoryRaw {
  categories: { name: string; imageUrl: string; color: string }[];
}

export type Categories = CategoryRaw["categories"];

export type Category = Categories[number];
