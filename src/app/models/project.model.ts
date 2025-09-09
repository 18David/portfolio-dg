export interface Project {
  id: string;
  title: string;
  description: string;
  media: { type: 'image' | 'video'; src: string }[];
  keywords: string[];
  date: string;     // format ISO
  duration?: string;
  madeWith: string[];
  madeFor: string;
}
