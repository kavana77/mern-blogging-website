import { Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  firstLine: string;
  content: string;
  image: string;
  imagePublicId?: string;
  tags: string;
  category: string;
  readingTime?: string;
  createdAt: Date;
  updatedAt?: Date;
}
