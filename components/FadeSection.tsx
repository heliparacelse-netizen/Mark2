'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

export default function FadeSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fade-in ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}
