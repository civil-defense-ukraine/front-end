import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  onSwipe: (diff: number) => void;
  className: string;
};

export const MobileSwiper: React.FC<Props> = ({
  children,
  onSwipe,
  className,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      return;
    }

    setStartX(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        return;
      }

      const endX = e.changedTouches[0].clientX;

      const deltaX = endX - startX;

      onSwipe(deltaX);
    },
    [startX, onSwipe],
  );

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  return (
    <section ref={wrapperRef} className={className}>
      {children}
    </section>
  );
};
