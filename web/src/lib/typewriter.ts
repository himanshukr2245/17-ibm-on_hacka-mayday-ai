'use client';

import { useEffect, useState } from 'react';

export function useTypewriter(text: string, speedMs = 18): string {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      setDisplayed(text ? text.slice(0, 1) : '');
    }, 0);

    if (!text) {
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i + 1));
      if (i >= text.length) clearInterval(interval);
    }, speedMs);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [text, speedMs]);

  return displayed;
}
