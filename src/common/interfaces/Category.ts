export interface CategoryRaw {
  categories: { name: string; imageUrl: string; color: string }[];
}

export type Category = CategoryRaw["categories"];
