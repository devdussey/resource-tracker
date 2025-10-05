import { useState, useEffect } from 'react';
import { storageService, type WidgetConfig } from '../lib/storage';

export const useWidgetConfigs = () => {
  const [configs, setConfigs] = useState<WidgetConfig[]>([]);
  const [loading, setLoading] = useState(true);

  const loadConfigs = () => {
    try {
      const loadedConfigs = storageService.getConfigs();
      setConfigs(loadedConfigs);
    } catch (error) {
      console.error('Error loading widget configs:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = (id: string, updates: Partial<WidgetConfig>) => {
    try {
      storageService.updateConfig(id, updates);
      loadConfigs();
    } catch (error) {
      console.error('Error updating widget config:', error);
    }
  };

  const clearAllConfigs = () => {
    try {
      storageService.clearAll();
      loadConfigs();
    } catch (error) {
      console.error('Error clearing configs:', error);
    }
  };

  const resetToDefaults = () => {
    try {
      storageService.resetToDefaults();
      loadConfigs();
    } catch (error) {
      console.error('Error resetting configs:', error);
    }
  };

  useEffect(() => {
    loadConfigs();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'widget_configs') {
        loadConfigs();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    configs,
    loading,
    updateConfig,
    refreshConfigs: loadConfigs,
    clearAllConfigs,
    resetToDefaults,
  };
};
