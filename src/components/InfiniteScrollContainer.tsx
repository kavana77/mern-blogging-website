import { useInView } from "react-intersection-observer";
import type { InfiniteScrollContainerProps } from "../types/data";

const InfiniteScrollContainer = ({
  children,
  onBottomReached,
  className,
}: InfiniteScrollContainerProps) => {
  const { ref } = useInView({
    rootMargin: "50px",
    onChange(inView) {
      if (inView) {
        onBottomReached();
      }
    },
  });
  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
};

export default InfiniteScrollContainer;
