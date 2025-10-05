import { type ReactNode } from 'react';
import { type WidgetConfig } from '../lib/storage';

type WidgetProps = {
  config: WidgetConfig;
  children: ReactNode;
  onClose: () => void;
};

const themeStyles = {
  glass: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl',
  dark: 'bg-gray-900/95 border border-gray-700 shadow-2xl',
  light: 'bg-white/95 border border-gray-200 shadow-2xl',
  neon: 'bg-black/90 border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)]',
};

const positionStyles = {
  'top-left': 'top-8 left-8',
  'top-right': 'top-8 right-8',
  'bottom-left': 'bottom-8 left-8',
  'bottom-right': 'bottom-8 right-8',
};

export const Widget = ({ config, children, onClose }: WidgetProps) => {
  return (
    <div
      className={`fixed ${positionStyles[config.position]} ${
        themeStyles[config.theme]
      } rounded-2xl p-6 min-w-[320px] animate-slide-in z-50 transition-all duration-300`}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        aria-label="Close widget"
      >
        <span className="text-lg leading-none opacity-60 hover:opacity-100">×</span>
      </button>
      {children}
    </div>
  );
};
