import type { LaneConfig } from '../types';

interface LaneProps {
    config: LaneConfig;
    isActive: boolean;
}

const COLOR_VARIANTS: Record<string, { base: string, active: string, border: string, text: string }> = {
    red: { base: 'bg-red-900/20', active: 'bg-red-500/40', border: 'border-red-500/50', text: 'text-red-400' },
    orange: { base: 'bg-orange-900/20', active: 'bg-orange-500/40', border: 'border-orange-500/50', text: 'text-orange-400' },
    yellow: { base: 'bg-yellow-900/20', active: 'bg-yellow-500/40', border: 'border-yellow-500/50', text: 'text-yellow-400' },
    green: { base: 'bg-green-900/20', active: 'bg-green-500/40', border: 'border-green-500/50', text: 'text-green-400' },
    cyan: { base: 'bg-cyan-900/20', active: 'bg-cyan-500/40', border: 'border-cyan-500/50', text: 'text-cyan-400' },
    blue: { base: 'bg-blue-900/20', active: 'bg-blue-500/40', border: 'border-blue-500/50', text: 'text-blue-400' },
    indigo: { base: 'bg-indigo-900/20', active: 'bg-indigo-500/40', border: 'border-indigo-500/50', text: 'text-indigo-400' },
    fuchsia: { base: 'bg-fuchsia-900/20', active: 'bg-fuchsia-500/40', border: 'border-fuchsia-500/50', text: 'text-fuchsia-400' },
};

export const Lane = ({ config, isActive }: LaneProps) => {
    const colors = COLOR_VARIANTS[config.color] || COLOR_VARIANTS.red;

    // Cannon SVG
    const Cannon = () => (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 rotate-180">
            <path d="M10 2L14 18H6L10 2Z" />
            <rect x="8" y="16" width="4" height="4" />
        </svg>
    );

    return (
        <div
            className={`relative h-full flex-1 border-r ${colors.border} ${isActive ? colors.active : colors.base} transition-colors duration-75 flex flex-col items-center`}
        >
            {/* Laser Beam */}
            {isActive && (
                <div
                    className={`absolute bottom-[20%] w-[4px] h-[80%] ${colors.text.replace('text', 'bg')} animate-laser z-20`}
                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                />
            )}

            <div className={`mt-4 text-[10px] font-bold uppercase tracking-widest ${colors.text} opacity-80 whitespace-nowrap`}>
                {config.finger}
            </div>

            <div className="flex-1"></div>

            {/* Cannon at Judgement Line */}
            <div className={`absolute bottom-[16%] ${colors.text} z-20 transition-transform duration-75 ${isActive ? 'scale-90 translate-y-1' : ''}`}>
                <Cannon />
            </div>

            <div className="mb-4 w-full text-center text-white/50 font-mono text-xs uppercase">
                {config.keys.join(' ')}
            </div>

            {/* Judgement Line Indicator - Hidden or Stylized for Invader */}
            <div className="absolute bottom-[20%] w-full h-[2px] bg-white/5"></div>
        </div>
    );
};
