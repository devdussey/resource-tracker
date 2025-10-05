import { useState, useEffect, useCallback, useRef } from 'react';
import { type WidgetConfig } from '../lib/supabase';

type ActiveWidget = {
  config: WidgetConfig;
  startTime: number;
};

export const useWidgetScheduler = (configs: WidgetConfig[]) => {
  const [activeWidgets, setActiveWidgets] = useState<ActiveWidget[]>([]);
  const schedulersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const hideTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const showWidget = useCallback((config: WidgetConfig) => {
    setActiveWidgets((prev) => {
      const exists = prev.some((w) => w.config.id === config.id);
      if (exists) return prev;
      return [...prev, { config, startTime: Date.now() }];
    });

    const existingHideTimer = hideTimersRef.current.get(config.id);
    if (existingHideTimer) {
      clearTimeout(existingHideTimer);
    }

    const hideTimer = setTimeout(() => {
      hideWidget(config.id);
    }, config.display_duration * 1000);

    hideTimersRef.current.set(config.id, hideTimer);
  }, []);

  const hideWidget = useCallback((configId: string) => {
    setActiveWidgets((prev) => prev.filter((w) => w.config.id !== configId));
    const hideTimer = hideTimersRef.current.get(configId);
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimersRef.current.delete(configId);
    }
  }, []);

  useEffect(() => {
    schedulersRef.current.forEach((timer) => clearInterval(timer));
    schedulersRef.current.clear();

    configs.forEach((config) => {
      if (!config.enabled) return;

      showWidget(config);

      const interval = setInterval(() => {
        showWidget(config);
      }, config.display_interval * 1000);

      schedulersRef.current.set(config.id, interval);
    });

    return () => {
      schedulersRef.current.forEach((timer) => clearInterval(timer));
      schedulersRef.current.clear();
      hideTimersRef.current.forEach((timer) => clearTimeout(timer));
      hideTimersRef.current.clear();
    };
  }, [configs, showWidget]);

  return { activeWidgets, hideWidget };
};
