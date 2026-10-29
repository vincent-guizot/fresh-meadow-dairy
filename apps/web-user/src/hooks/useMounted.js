'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to safely verify client-side mounting
 * Useful to avoid hydration mismatches with localStorage/window
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export default useMounted;
