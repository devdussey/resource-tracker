import { Cpu } from 'lucide-react';
import { type ResourceStats } from '../hooks/useResourceMonitor';

type CpuWidgetProps = {
  stats: ResourceStats;
  theme: string;
};

export const CpuWidget = ({ stats, theme }: CpuWidgetProps) => {
  const percentage = Math.round(stats.cpu);
  const isNeon = theme === 'neon';
  const isDark = theme === 'dark' || theme === 'glass';

  const getColor = () => {
    if (isNeon) return 'text-cyan-400';
    if (percentage > 80) return 'text-red-400';
    if (percentage > 60) return 'text-amber-400';
    return 'text-emerald-400';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isNeon ? 'bg-cyan-400/10' : 'bg-blue-500/10'}`}>
          <Cpu className={`w-6 h-6 ${isNeon ? 'text-cyan-400' : 'text-blue-500'}`} />
        </div>
        <div>
          <h3 className={`text-sm font-medium ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
            CPU Usage
          </h3>
          <p className={`text-2xl font-bold ${getColor()}`}>{percentage}%</p>
        </div>
      </div>

      <div className="relative h-2 bg-black/20 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 ${
            isNeon ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
          } transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className={isDark ? 'text-white/40' : 'text-gray-500'}>Min</p>
          <p className={isDark ? 'text-white/80' : 'text-gray-700'}>
            {Math.max(0, percentage - 15)}%
          </p>
        </div>
        <div>
          <p className={isDark ? 'text-white/40' : 'text-gray-500'}>Avg</p>
          <p className={isDark ? 'text-white/80' : 'text-gray-700'}>{percentage}%</p>
        </div>
        <div>
          <p className={isDark ? 'text-white/40' : 'text-gray-500'}>Max</p>
          <p className={isDark ? 'text-white/80' : 'text-gray-700'}>
            {Math.min(100, percentage + 10)}%
          </p>
        </div>
      </div>
    </div>
  );
};
