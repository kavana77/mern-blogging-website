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
