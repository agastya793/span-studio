'use client';

import { useState, useEffect } from 'react';

export function useScrollPosition(threshold: number = 80) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
    };

    // Run on initial mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { scrollY, isScrolled };
}
