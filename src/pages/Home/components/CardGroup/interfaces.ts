export interface CardGroupProps {
  podcasts: {
    id: string;
    title: string;
    coverUrl: string;
    category?: string;
    createdAt: string;
    author: { name: string };
  }[];
}
