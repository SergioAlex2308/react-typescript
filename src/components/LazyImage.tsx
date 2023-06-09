import { useState, useRef, useEffect } from "react";
import type { ImgHTMLAttributes } from "react";

type LazyImageProps = {
  src: string;
  onLazyLoad?: (node: HTMLImageElement) => void;
  onViewed?: (state: boolean) => void;
};
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative;

export const LazyImage = ({
  src,
  onLazyLoad,
  onViewed,
  ...imgProps
}: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);

  const [currentSrc, setCurrentSrc] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );

  const [firstView, setFirstView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSrc(src);
          if (node.current && onLazyLoad) {
            onLazyLoad(node.current);
          }
        }
      });
    });
    if (node.current) observer.observe(node.current);

    return () => {
      observer.disconnect();
      setFirstView(false);
    };
  }, [src]);

  useEffect(() => {
    setFirstView(true);
    onViewed && onViewed(firstView);
  }, [currentSrc]);

  return <img ref={node} src={currentSrc} {...imgProps} />;
};
