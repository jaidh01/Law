export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio?: string;
  date: string;
  image: string;
  imageCaption?: string;
  category: string;
  tags: string[];
}