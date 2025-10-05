import { Network } from 'lucide-react';
import { type ResourceStats } from '../hooks/useResourceMonitor';

type NetworkWidgetProps = {
  stats: ResourceStats;
  theme: string;
};

export const NetworkWidget = ({ stats, theme }: NetworkWidgetProps) => {
  const isNeon = theme === 'neon';
  const isDark = theme === 'dark' || theme === 'glass';

  const formatSpeed = (mbps: number) => {
    if (mbps < 1) return `${(mbps * 1024).toFixed(0)} KB/s`;
    return `${mbps.toFixed(2)} MB/s`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isNeon ? 'bg-green-400/10' : 'bg-green-500/10'}`}>
          <Network className={`w-6 h-6 ${isNeon ? 'text-green-400' : 'text-green-500'}`} />
        </div>
        <div>
          <h3 className={`text-sm font-medium ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
            Network
          </h3>
          <p className={`text-lg font-bold ${isNeon ? 'text-green-400' : 'text-green-500'}`}>
            Active
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className={`${isNeon ? 'bg-green-400/5' : 'bg-black/10'} rounded-lg p-3`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Download</p>
            <p className={`text-sm font-bold ${isNeon ? 'text-green-400' : 'text-green-600'}`}>
              {formatSpeed(stats.network.download)}
            </p>
          </div>
          <div className="relative h-1.5 bg-black/20 rounded-full overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 ${
                isNeon ? 'bg-green-400' : 'bg-green-500'
              } transition-all duration-300 rounded-full`}
              style={{ width: `${Math.min(100, (stats.network.download / 10) * 100)}%` }}
            />
          </div>
        </div>

        <div className={`${isNeon ? 'bg-blue-400/5' : 'bg-black/10'} rounded-lg p-3`}>
          <div className="flex items-center justify-between mb-2">
            <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Upload</p>
            <p className={`text-sm font-bold ${isNeon ? 'text-blue-400' : 'text-blue-600'}`}>
              {formatSpeed(stats.network.upload)}
            </p>
          </div>
          <div className="relative h-1.5 bg-black/20 rounded-full overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 ${
                isNeon ? 'bg-blue-400' : 'bg-blue-500'
              } transition-all duration-300 rounded-full`}
              style={{ width: `${Math.min(100, (stats.network.upload / 3) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
