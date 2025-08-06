import type React from "react";

export interface IPostProps {
post:{
  _id: string,
  title: string,
  firstLine: string,
  image: string,
  createdAt: string,
  author: {
    name: string
  }
}

}

export interface InfiniteScrollContainerProps {
  children: React.ReactNode;
  onBottomReached: () => void;
  className?: string;
}

export interface UserAuthFormProps {
  type: string;
}

export interface InputBoxProps {
  type: string,
  id?: string,
  value?: string,
  placeholder?: string,
  icon?: React.ReactNode
}
export type Blog = {
  blog: {
  _id: string;
  title: string;
  content: string;
  firstLine: string;
  image: string;
  category: string;
  readingTime: string;
  tags: string[];
  reactions: {
    like: number;
    love: number;
    fire: number;
    wow: number;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  author: {
    name: string;
  };
  createdAt: string;
}
};
