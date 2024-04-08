import { useEffect, useRef, useState } from 'react';

/**
 *
 * @returns Dom Ref
 */
const useResize = () => {
  const [contentRect, setContentRect] = useState<DOMRectReadOnly>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    toJSON: () => '',
    top: 0,
    width: 0,
    x: 0,
    y: 0
  });
  const ob = new ResizeObserver((entries) => {
    for (const entrie of entries) {
      setContentRect(entrie.contentRect);
    }
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current);
      ob.observe(ref.current);
    } else {
      ob.observe(document.body);
    }

    return () => {
      if (ref.current) {
        ob.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, contentRect };
};

export default useResize;
