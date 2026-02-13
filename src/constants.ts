import type { LaneConfig, MissionConfig } from './types';

export const LANE_CONFIGS: LaneConfig[] = [
    { id: 1, finger: 'Left Pinky', color: 'red', keys: ['q', 'a', 'z'] },
    { id: 2, finger: 'Left Ring', color: 'orange', keys: ['w', 's', 'x'] },
    { id: 3, finger: 'Left Middle', color: 'yellow', keys: ['e', 'd', 'c'] },
    { id: 4, finger: 'Left Index', color: 'green', keys: ['r', 't', 'f', 'g', 'v', 'b'] },
    { id: 5, finger: 'Right Index', color: 'cyan', keys: ['y', 'u', 'h', 'j', 'n', 'm'] },
    { id: 6, finger: 'Right Middle', color: 'blue', keys: ['i', 'k', ','] },
    { id: 7, finger: 'Right Ring', color: 'indigo', keys: ['o', 'l', '.'] },
    { id: 8, finger: 'Right Pinky', color: 'fuchsia', keys: ['p', ';', '/'] },
];

// 日本語単語リスト（表示用の日本語とローマ字入力のペア）
export const WORD_LIST: { display: string; romaji: string }[] = [
    { display: 'そら', romaji: 'sora' },
    { display: 'くも', romaji: 'kumo' },
    { display: 'かぜ', romaji: 'kaze' },
    { display: 'うみ', romaji: 'umi' },
    { display: 'やま', romaji: 'yama' },
    { display: 'はな', romaji: 'hana' },
    { display: 'ひかり', romaji: 'hikari' },
    { display: 'つき', romaji: 'tuki' },
    { display: 'ほし', romaji: 'hosi' },
    { display: 'かわ', romaji: 'kawa' },
    { display: 'もり', romaji: 'mori' },
    { display: 'ゆき', romaji: 'yuki' },
    { display: 'あめ', romaji: 'ame' },
    { display: 'たいよう', romaji: 'taiyou' },
    { display: 'こころ', romaji: 'kokoro' },
    { display: 'ことば', romaji: 'kotoba' },
    { display: 'さくら', romaji: 'sakura' },
    { display: 'あさひ', romaji: 'asahi' },
    { display: 'なみ', romaji: 'nami' },
    { display: 'みどり', romaji: 'midori' },
];

export const MISSIONS: MissionConfig[] = [
    { id: 1, label: 'M1', bpm: 60,  noteSpeed: 0.15, spawnPreTime: 10000, wordCount: 6,  description: '初陣。敵の動きは遅い。' },
    { id: 2, label: 'M2', bpm: 70,  noteSpeed: 0.18, spawnPreTime: 8333,  wordCount: 8,  description: '偵察部隊を撃退せよ。' },
    { id: 3, label: 'M3', bpm: 80,  noteSpeed: 0.25, spawnPreTime: 6154,  wordCount: 10, description: '主力部隊が来た。気を抜くな。' },
    { id: 4, label: 'M4', bpm: 95,  noteSpeed: 0.30, spawnPreTime: 5128,  wordCount: 12, description: '侵略の波が加速している。' },
    { id: 5, label: 'M5', bpm: 110, noteSpeed: 0.35, spawnPreTime: 4400,  wordCount: 14, description: '精鋭部隊の猛攻。集中せよ。' },
    { id: 6, label: 'M6', bpm: 130, noteSpeed: 0.40, spawnPreTime: 3846,  wordCount: 16, description: '敵の本気が見えてきた。' },
    { id: 7, label: 'M7', bpm: 150, noteSpeed: 0.50, spawnPreTime: 3077,  wordCount: 20, description: '最終決戦。全てを賭けろ。' },
];

export const GAME_CONSTANTS = {
    JUDGEMENT_LINE_Y: 80, // % from top
    NOTE_SPEED: 0.25, // px/ms (速度1/2)
    HIT_WINDOW: {
        PERFECT: 65,  // ms (+30%)
        GOOD: 130,    // ms (+30%)
        MISS: 260,    // ms (+30%)
    },
    SPAWN_PRE_TIME: 6154, // ms (速度1/2のため2倍: 3077*2)
};
