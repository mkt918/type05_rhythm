import type { LaneConfig } from './types';

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

export const GAME_CONSTANTS = {
    JUDGEMENT_LINE_Y: 80, // % from top
    NOTE_SPEED: 0.5, // px/ms
    HIT_WINDOW: {
        PERFECT: 50, // ms
        GOOD: 100, // ms
        MISS: 200, // ms
    },
    SPAWN_PRE_TIME: 2000, // ms before target time to spawn
};
