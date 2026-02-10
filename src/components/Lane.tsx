import type { LaneConfig } from '../types';

interface LaneProps {
    config: LaneConfig;
    isActive: boolean;
}

const COLOR_VARIANTS: Record<string, { base: string, active: string, border: string }> = {
    red: { base: 'bg-red-900/20', active: 'bg-red-500/40', border: 'border-red-500/50' },
    orange: { base: 'bg-orange-900/20', active: 'bg-orange-500/40', border: 'border-orange-500/50' },
    yellow: { base: 'bg-yellow-900/20', active: 'bg-yellow-500/40', border: 'border-yellow-500/50' },
    green: { base: 'bg-green-900/20', active: 'bg-green-500/40', border: 'border-green-500/50' },
    cyan: { base: 'bg-cyan-900/20', active: 'bg-cyan-500/40', border: 'border-cyan-500/50' },
    blue: { base: 'bg-blue-900/20', active: 'bg-blue-500/40', border: 'border-blue-500/50' },
    indigo: { base: 'bg-indigo-900/20', active: 'bg-indigo-500/40', border: 'border-indigo-500/50' },
    fuchsia: { base: 'bg-fuchsia-900/20', active: 'bg-fuchsia-500/40', border: 'border-fuchsia-500/50' },
};

export const Lane = ({ config, isActive }: LaneProps) => {
    const colors = COLOR_VARIANTS[config.color] || COLOR_VARIANTS.red;

    return (
        <div
            className={`relative h-full flex-1 border-r ${colors.border} ${isActive ? colors.active : colors.base} transition-colors duration-75 flex flex-col justify-end`}
        >
            <div className="absolute bottom-4 w-full text-center text-white/50 font-mono text-sm uppercase">
                {config.keys.join(' ')}
            </div>

            {/* Judgement Line Indicator (Visual only, line is drawn by Stage) */}
            <div className="absolute bottom-[20%] w-full h-1 bg-white/20"></div>
        </div>
    );
};
