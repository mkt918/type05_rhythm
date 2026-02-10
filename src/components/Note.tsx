import type { Note as NoteType } from '../types';

interface NoteProps {
    note: NoteType;
    y: number;
    colorName: string; // e.g. 'red'
}

const NOTE_COLORS: Record<string, string> = {
    red: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]',
    orange: 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]',
    yellow: 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)]',
    green: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]',
    cyan: 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]',
    blue: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]',
    indigo: 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)]',
    fuchsia: 'bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.6)]',
};

export const Note = ({ note, y, colorName }: NoteProps) => {
    const colorClass = NOTE_COLORS[colorName] || NOTE_COLORS.red;

    // Start from TOP. 
    // y is pixels from top.

    // Size variation based on visualType
    const sizeClasses = {
        upper: 'w-10 h-10 text-lg',
        middle: 'w-8 h-8 text-base',
        lower: 'w-6 h-6 text-sm',
    };

    const size = sizeClasses[note.visualType] || sizeClasses.middle;

    return (
        <div
            className={`absolute left-1/2 -translate-x-1/2 ${colorClass} ${size} flex items-center justify-center rounded-full text-white font-bold pointer-events-none transform-gpu z-10`}
            style={{ top: `${y}%` }}
        >
            {note.char.toUpperCase()}
        </div>
    );
};
