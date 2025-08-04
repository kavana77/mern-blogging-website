import type React from "react";

export interface IPostProps {
  post: {
    id: number;
    title: string;
    body: string;
    views: number;
    reactions: {
      likes: number;
      dislikes: number;
    };
  };
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
