import type { Note as NoteType, ColorTheme } from '../types';

const TOTAL_LANES = 8;

interface NoteProps {
    note: NoteType;
    y: number;
    colorName: string;
    laneIndex: number;
    colorTheme: ColorTheme;
}

// Simple Invader SVGs
const Invader1 = () => (
    <svg viewBox="0 0 12 8" fill="currentColor" className="w-full h-full">
        <rect x="2" y="0" width="8" height="1" />
        <rect x="1" y="1" width="10" height="1" />
        <rect x="0" y="2" width="12" height="1" />
        <rect x="0" y="3" width="3" height="1" />
        <rect x="5" y="3" width="2" height="1" />
        <rect x="9" y="3" width="3" height="1" />
        <rect x="0" y="4" width="12" height="1" />
        <rect x="2" y="5" width="1" height="1" />
        <rect x="9" y="5" width="1" height="1" />
        <rect x="3" y="6" width="1" height="1" />
        <rect x="8" y="6" width="1" height="1" />
        <rect x="1" y="7" width="2" height="1" />
        <rect x="9" y="7" width="2" height="1" />
    </svg>
);

const Invader2 = () => (
    <svg viewBox="0 0 11 8" fill="currentColor" className="w-full h-full">
        <rect x="2" y="0" width="1" height="1" />
        <rect x="8" y="0" width="1" height="1" />
        <rect x="0" y="1" width="1" height="1" />
        <rect x="3" y="1" width="1" height="1" />
        <rect x="7" y="1" width="1" height="1" />
        <rect x="10" y="1" width="1" height="1" />
        <rect x="0" y="2" width="1" height="1" />
        <rect x="2" y="2" width="7" height="1" />
        <rect x="10" y="2" width="1" height="1" />
        <rect x="0" y="3" width="3" height="1" />
        <rect x="4" y="3" width="3" height="1" />
        <rect x="8" y="3" width="3" height="1" />
        <rect x="0" y="4" width="11" height="1" />
        <rect x="1" y="5" width="9" height="1" />
        <rect x="2" y="6" width="1" height="1" />
        <rect x="8" y="6" width="1" height="1" />
        <rect x="1" y="7" width="1" height="1" />
        <rect x="9" y="7" width="1" height="1" />
    </svg>
);

const Invader3 = () => (
    <svg viewBox="0 0 8 8" fill="currentColor" className="w-full h-full">
        <rect x="3" y="0" width="2" height="1" />
        <rect x="2" y="0" width="4" height="1" />
        <rect x="1" y="1" width="6" height="1" />
        <rect x="0" y="2" width="2" height="1" />
        <rect x="3" y="2" width="2" height="1" />
        <rect x="6" y="2" width="2" height="1" />
        <rect x="0" y="3" width="8" height="1" />
        <rect x="1" y="4" width="6" height="1" />
        <rect x="2" y="5" width="1" height="1" />
        <rect x="5" y="5" width="1" height="1" />
        <rect x="1" y="6" width="1" height="1" />
        <rect x="6" y="6" width="1" height="1" />
        <rect x="0" y="7" width="1" height="1" />
        <rect x="7" y="7" width="1" height="1" />
    </svg>
);

export const Note = ({ note, y, colorName, laneIndex }: NoteProps) => {
    // Map visualType to Invader variant
    const IvaderComponent =
        note.visualType === 'upper' ? Invader1 :
            note.visualType === 'middle' ? Invader2 :
                Invader3;

    // Use Tailwind colors directly for text-color (which fills the SVG)
    const colorClass = `text-${colorName}-400`;
    const leftPercent = ((laneIndex + 0.5) / TOTAL_LANES) * 100;

    return (
        <div
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex flex-col items-center justify-center font-bold pointer-events-none transform-gpu z-10 animate-float`}
            style={{
                top: `${y}%`,
                left: `${leftPercent}%`,
                filter: `drop-shadow(0 0 4px currentColor)`
            }}
        >
            <div className={`w-full h-full ${colorClass}`}>
                <IvaderComponent />
            </div>

            {/* Character on top */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl drop-shadow-md">
                {note.char.toUpperCase()}
            </div>
        </div>
    );
};
