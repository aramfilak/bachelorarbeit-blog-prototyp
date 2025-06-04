export type Blog = {
  author: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string[];
  readingTime: number;
  readingTimeUnit: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type NewBlog = {
  author: string;
  title: string;
  description: string;
  content: string;
  readingTime: number;
  readingTimeUnit: string;
  id?: number | undefined;
  imageUrl?: string | undefined;
  tags?: string[] | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
};
