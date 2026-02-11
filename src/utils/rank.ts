import type { Rank } from '../types';

export function calcRank(score: number, maxScore: number): Rank {
    if (maxScore === 0) return 'D';
    const pct = score / maxScore;
    if (pct >= 0.90) return 'S';
    if (pct >= 0.75) return 'A';
    if (pct >= 0.60) return 'B';
    if (pct >= 0.40) return 'C';
    return 'D';
}

export function calcCoins(rank: Rank): number {
    const table: Record<Rank, number> = { S: 5, A: 3, B: 2, C: 1, D: 0 };
    return table[rank];
}
