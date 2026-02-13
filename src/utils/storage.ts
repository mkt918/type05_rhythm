import type { PlayerData } from '../types';

const STORAGE_KEY = 'type05_rhythm_player';

export const DEFAULT_PLAYER_DATA: PlayerData = {
    coins: 0,
    ownedSkins: [],
    equippedSkin: {
        noteShape: 'circle',
        colorTheme: 'default',
        bgEffect: 'none',
        feedbackStyle: 'default',
    },
    currentMission: 1,
};

export function loadPlayerData(): PlayerData {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { ...DEFAULT_PLAYER_DATA };
        const parsed = JSON.parse(raw) as PlayerData;
        // equippedSkin が欠けている場合のフォールバック
        return {
            ...DEFAULT_PLAYER_DATA,
            ...parsed,
            equippedSkin: { ...DEFAULT_PLAYER_DATA.equippedSkin, ...parsed.equippedSkin },
        };
    } catch {
        return { ...DEFAULT_PLAYER_DATA };
    }
}

export function savePlayerData(data: PlayerData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
