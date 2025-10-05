import { MemoryStick } from 'lucide-react';
import { type ResourceStats } from '../hooks/useResourceMonitor';

type MemoryWidgetProps = {
  stats: ResourceStats;
  theme: string;
};

export const MemoryWidget = ({ stats, theme }: MemoryWidgetProps) => {
  const percentage = Math.round(stats.memory);
  const isNeon = theme === 'neon';
  const isDark = theme === 'dark' || theme === 'glass';

  const usedGB = ((percentage / 100) * 16).toFixed(1);
  const totalGB = 16;

  const getColor = () => {
    if (isNeon) return 'text-purple-400';
    if (percentage > 85) return 'text-red-400';
    if (percentage > 70) return 'text-amber-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isNeon ? 'bg-purple-400/10' : 'bg-purple-500/10'}`}>
          <MemoryStick className={`w-6 h-6 ${isNeon ? 'text-purple-400' : 'text-purple-500'}`} />
        </div>
        <div>
          <h3 className={`text-sm font-medium ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
            Memory
          </h3>
          <p className={`text-2xl font-bold ${getColor()}`}>{percentage}%</p>
        </div>
      </div>

      <div className="relative h-2 bg-black/20 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 ${
            isNeon ? 'bg-gradient-to-r from-purple-400 to-pink-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
          } transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className={`${isNeon ? 'bg-purple-400/5' : 'bg-black/10'} rounded-lg p-3`}>
          <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Used</p>
          <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {usedGB} GB
          </p>
        </div>
        <div className={`${isNeon ? 'bg-purple-400/5' : 'bg-black/10'} rounded-lg p-3`}>
          <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Total</p>
          <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {totalGB} GB
          </p>
        </div>
      </div>
    </div>
  );
};
