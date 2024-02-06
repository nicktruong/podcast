export interface CardGroupProps {
  podcasts: {
    id: string;
    title: string;
    coverUrl: string;
    createdAt: string;
    author: { name: string };
    category?: string;
  }[];
}
