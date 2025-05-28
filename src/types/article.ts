export interface Article {
  id: number | string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio?: string;
  date: string;
  image: string;
  imageCaption?: string;
  imageAlt?: string;
  imageCredit?: string;
  category: string;
  tags: string[];
  pdf_url?: string;
  source?: string;
}