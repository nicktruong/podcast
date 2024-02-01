import { Category } from "@/common/interfaces";

export interface CardProps {
  link: string;
  image: string;
  title: string;
  author: string;
  imageAlt: string;
  createdAt: string;
  categoryData: Category;
}
