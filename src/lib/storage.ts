export type WidgetConfig = {
  id: string;
  user_id: string | null;
  widget_type: 'cpu' | 'memory' | 'network' | 'disk';
  enabled: boolean;
  display_interval: number;
  display_duration: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  theme: 'dark' | 'light' | 'glass' | 'neon';
  created_at: string;
  updated_at: string;
};

const STORAGE_KEY = 'widget_configs';

const defaultConfigs: WidgetConfig[] = [
  {
    id: 'cpu-widget',
    user_id: null,
    widget_type: 'cpu',
    enabled: true,
    display_interval: 60,
    display_duration: 5,
    position: 'top-right',
    theme: 'glass',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'memory-widget',
    user_id: null,
    widget_type: 'memory',
    enabled: true,
    display_interval: 60,
    display_duration: 5,
    position: 'top-left',
    theme: 'glass',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'network-widget',
    user_id: null,
    widget_type: 'network',
    enabled: false,
    display_interval: 60,
    display_duration: 5,
    position: 'bottom-left',
    theme: 'glass',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const storageService = {
  getConfigs(): WidgetConfig[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        this.setConfigs(defaultConfigs);
        return defaultConfigs;
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultConfigs;
    }
  },

  setConfigs(configs: WidgetConfig[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  updateConfig(id: string, updates: Partial<WidgetConfig>): void {
    const configs = this.getConfigs();
    const index = configs.findIndex((c) => c.id === id);
    if (index !== -1) {
      configs[index] = {
        ...configs[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      this.setConfigs(configs);
    }
  },

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  resetToDefaults(): void {
    this.setConfigs(defaultConfigs);
  },
};
