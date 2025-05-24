export interface Judgment {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  court: string;
  judge: string;
  date: string;
  pdfFile: string;
  tags: string[];
}