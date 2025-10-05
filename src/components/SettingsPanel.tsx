import { useState } from 'react';
import { Settings, X, Trash2, RotateCcw } from 'lucide-react';
import { type WidgetConfig } from '../lib/storage';

type SettingsPanelProps = {
  configs: WidgetConfig[];
  onUpdateConfig: (id: string, updates: Partial<WidgetConfig>) => void;
  onClearStorage: () => void;
  onResetToDefaults: () => void;
  isOpen: boolean;
  onClose: () => void;
};

export const SettingsPanel = ({ configs, onUpdateConfig, onClearStorage, onResetToDefaults, isOpen, onClose }: SettingsPanelProps) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleClearStorage = () => {
    onClearStorage();
    setShowClearConfirm(false);
  };

  const handleResetToDefaults = () => {
    onResetToDefaults();
    setShowResetConfirm(false);
  };
  if (!isOpen) return null;

  const widgetLabels = {
    cpu: 'CPU Monitor',
    memory: 'Memory Monitor',
    network: 'Network Monitor',
    disk: 'Disk Monitor',
  };

  const positions = [
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-right', label: 'Bottom Right' },
  ];

  const themes = [
    { value: 'glass', label: 'Glass' },
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'neon', label: 'Neon' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Widget Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex-1 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Defaults
            </button>
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex-1 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All Data
            </button>
          </div>

          <div className="space-y-6">
            {configs.map((config) => (
              <div key={config.id} className="bg-gray-50 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {widgetLabels[config.widget_type as keyof typeof widgetLabels]}
                  </h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.enabled}
                      onChange={(e) => onUpdateConfig(config.id, { enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Interval (seconds)
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="300"
                      value={config.display_interval}
                      onChange={(e) =>
                        onUpdateConfig(config.id, { display_interval: parseInt(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Duration (seconds)
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="30"
                      value={config.display_duration}
                      onChange={(e) =>
                        onUpdateConfig(config.id, { display_duration: parseInt(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                    <select
                      value={config.position}
                      onChange={(e) =>
                        onUpdateConfig(config.id, {
                          position: e.target.value as WidgetConfig['position'],
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {positions.map((pos) => (
                        <option key={pos.value} value={pos.value}>
                          {pos.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                    <select
                      value={config.theme}
                      onChange={(e) =>
                        onUpdateConfig(config.id, { theme: e.target.value as WidgetConfig['theme'] })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {themes.map((theme) => (
                        <option key={theme.value} value={theme.value}>
                          {theme.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showClearConfirm && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Clear All Data?</h3>
            <p className="text-gray-600 mb-6">
              This will remove all widget configurations from local storage. You'll need to reconfigure your widgets from scratch.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearStorage}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Reset to Defaults?</h3>
            <p className="text-gray-600 mb-6">
              This will restore all widget configurations to their default settings. Your current settings will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetToDefaults}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
