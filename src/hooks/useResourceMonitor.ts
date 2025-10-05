import { useState, useEffect, useCallback } from 'react';

export type ResourceStats = {
  cpu: number;
  memory: number;
  network: {
    download: number;
    upload: number;
  };
};

const generateRealisticStats = (): ResourceStats => {
  const baseTime = Date.now();
  const variation = Math.sin(baseTime / 10000) * 0.2 + 0.5;

  return {
    cpu: Math.min(100, Math.max(5, 30 + Math.random() * 40 * variation)),
    memory: Math.min(100, Math.max(20, 45 + Math.random() * 30 * variation)),
    network: {
      download: Math.random() * 10 * variation,
      upload: Math.random() * 3 * variation,
    },
  };
};

export const useResourceMonitor = (enabled: boolean = true) => {
  const [stats, setStats] = useState<ResourceStats>(generateRealisticStats());

  const updateStats = useCallback(() => {
    setStats(generateRealisticStats());
  }, []);

  useEffect(() => {
    if (!enabled) return;

    updateStats();
    const interval = setInterval(updateStats, 2000);

    return () => clearInterval(interval);
  }, [enabled, updateStats]);

  return stats;
};
