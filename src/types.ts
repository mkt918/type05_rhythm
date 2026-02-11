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

export type Screen = 'title' | 'game' | 'result' | 'shop';
export type Rank = 'S' | 'A' | 'B' | 'C' | 'D';
export type NoteShape = 'circle' | 'square' | 'diamond';
export type ColorTheme = 'default' | 'neon' | 'pastel';
export type BgEffect = 'none' | 'particles';
export type FeedbackStyle = 'default' | 'retro' | 'minimal';

export interface ResultData {
    score: number;
    maxScore: number;
    perfect: number;
    good: number;
    ok: number;
    miss: number;
    maxCombo: number;
    rank: Rank;
    coinsEarned: number;
}

export interface SkinEquip {
    noteShape: NoteShape;
    colorTheme: ColorTheme;
    bgEffect: BgEffect;
    feedbackStyle: FeedbackStyle;
}

export interface PlayerData {
    coins: number;
    ownedSkins: string[];
    equippedSkin: SkinEquip;
}
