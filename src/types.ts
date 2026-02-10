export type LaneId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface LaneConfig {
    id: LaneId;
    finger: string;
    color: string; // Tailwind color class base (e.g. "red")
    keys: string[];
}

export type VisualType = 'upper' | 'middle' | 'lower';

export interface Note {
    id: string;
    char: string;
    lane: LaneId;
    spawnTime: number; // ms
    targetTime: number; // ms (when it hits the judgement line)
    hit: boolean;
    visualType: VisualType;
    missed?: boolean;
}

export interface GameState {
    isPlaying: boolean;
    startTime: number; // timestamp when song/game started
    currentTime: number; // current timestamp relative to start
    score: number;
    combo: number;
    maxCombo: number;
}
