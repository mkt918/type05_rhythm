import type { Note as NoteType, NoteShape, ColorTheme } from '../types';

const TOTAL_LANES = 8;

interface NoteProps {
    note: NoteType;
    y: number;
    colorName: string;
    laneIndex: number;
    shape: NoteShape;
    colorTheme: ColorTheme;
}

const NOTE_COLORS: Record<string, Record<ColorTheme, string>> = {
    red:     { default: 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]',     neon: 'bg-red-400 shadow-[0_0_24px_rgba(239,68,68,1)]',     pastel: 'bg-red-300/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]' },
    orange:  { default: 'bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]', neon: 'bg-orange-400 shadow-[0_0_24px_rgba(249,115,22,1)]', pastel: 'bg-orange-300/80 shadow-[0_0_8px_rgba(249,115,22,0.4)]' },
    yellow:  { default: 'bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.8)]',  neon: 'bg-yellow-300 shadow-[0_0_24px_rgba(234,179,8,1)]',  pastel: 'bg-yellow-200/80 shadow-[0_0_8px_rgba(234,179,8,0.4)]' },
    green:   { default: 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]',   neon: 'bg-green-400 shadow-[0_0_24px_rgba(34,197,94,1)]',   pastel: 'bg-green-300/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]' },
    cyan:    { default: 'bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]',    neon: 'bg-cyan-300 shadow-[0_0_24px_rgba(6,182,212,1)]',    pastel: 'bg-cyan-300/80 shadow-[0_0_8px_rgba(6,182,212,0.4)]' },
    blue:    { default: 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]',   neon: 'bg-blue-400 shadow-[0_0_24px_rgba(59,130,246,1)]',   pastel: 'bg-blue-300/80 shadow-[0_0_8px_rgba(59,130,246,0.4)]' },
    indigo:  { default: 'bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]', neon: 'bg-indigo-400 shadow-[0_0_24px_rgba(99,102,241,1)]', pastel: 'bg-indigo-300/80 shadow-[0_0_8px_rgba(99,102,241,0.4)]' },
    fuchsia: { default: 'bg-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,0.8)]',neon: 'bg-fuchsia-400 shadow-[0_0_24px_rgba(217,70,239,1)]',pastel: 'bg-fuchsia-300/80 shadow-[0_0_8px_rgba(217,70,239,0.4)]' },
};

const SHAPE_CLASSES: Record<NoteShape, string> = {
    circle:  'rounded-full',
    square:  'rounded-md',
    diamond: 'rounded-sm rotate-45',
};

export const Note = ({ note, y, colorName, laneIndex, shape, colorTheme }: NoteProps) => {
    const colorClass = (NOTE_COLORS[colorName] ?? NOTE_COLORS.red)[colorTheme];
    const shapeClass = SHAPE_CLASSES[shape];
    const leftPercent = ((laneIndex + 0.5) / TOTAL_LANES) * 100;
    const isDiamond = shape === 'diamond';

    return (
        <div
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${colorClass} ${shapeClass} w-[4.5rem] h-[4.5rem] flex items-center justify-center text-white text-2xl font-bold pointer-events-none transform-gpu z-10`}
            style={{ top: `${y}%`, left: `${leftPercent}%` }}
        >
            <span className={isDiamond ? '-rotate-45' : ''}>
                {note.char.toUpperCase()}
            </span>
        </div>
    );
};
