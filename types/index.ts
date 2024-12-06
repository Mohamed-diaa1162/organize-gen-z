export interface Tutorial {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  isRead: boolean;
  readDate?: string;
  addedDate: string;
}

export interface Library {
  id: string;
  name: string;
  url: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  tags: string[];
  usageCount: number;
  addedDate: string;
}

export interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  description: string;
  tags: string[];
  language: string;
  isUsed: boolean;
  usedDate?: string;
  addedDate: string;
}