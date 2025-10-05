import { useState } from 'react';
import { Settings } from 'lucide-react';
import { useWidgetConfigs } from './hooks/useWidgetConfigs';
import { useResourceMonitor } from './hooks/useResourceMonitor';
import { useWidgetScheduler } from './hooks/useWidgetScheduler';
import { Widget } from './components/Widget';
import { CpuWidget } from './components/CpuWidget';
import { MemoryWidget } from './components/MemoryWidget';
import { NetworkWidget } from './components/NetworkWidget';
import { SettingsPanel } from './components/SettingsPanel';

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { configs, loading, updateConfig, clearAllConfigs, resetToDefaults } = useWidgetConfigs();
  const stats = useResourceMonitor(true);
  const { activeWidgets, hideWidget } = useWidgetScheduler(configs);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white/60 text-lg">Loading...</div>
      </div>
    );
  }

  const renderWidgetContent = (widgetType: string, theme: string) => {
    switch (widgetType) {
      case 'cpu':
        return <CpuWidget stats={stats} theme={theme} />;
      case 'memory':
        return <MemoryWidget stats={stats} theme={theme} />;
      case 'network':
        return <NetworkWidget stats={stats} theme={theme} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Resource Monitor
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Beautiful widgets that display system stats periodically in the background
          </p>

          <div className="flex items-center justify-center gap-4 pt-8">
            <button
              onClick={() => setSettingsOpen(true)}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-2xl"
            >
              <Settings className="w-5 h-5" />
              Configure Widgets
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-white mb-2">{Math.round(stats.cpu)}%</div>
              <div className="text-sm text-white/60">CPU Usage</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-white mb-2">{Math.round(stats.memory)}%</div>
              <div className="text-sm text-white/60">Memory</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-white mb-2">
                {stats.network.download.toFixed(1)} MB/s
              </div>
              <div className="text-sm text-white/60">Download</div>
            </div>
          </div>
        </div>
      </div>

      {activeWidgets.map(({ config }) => (
        <Widget key={config.id} config={config} onClose={() => hideWidget(config.id)}>
          {renderWidgetContent(config.widget_type, config.theme)}
        </Widget>
      ))}

      <SettingsPanel
        configs={configs}
        onUpdateConfig={updateConfig}
        onClearStorage={clearAllConfigs}
        onResetToDefaults={resetToDefaults}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}

export default App;
