import type { ResultData, Rank } from '../types';

interface ResultScreenProps {
    result: ResultData;
    totalCoins: number;
    onRetry: () => void;
    onShop: () => void;
    onTitle: () => void;
}

const RANK_STYLES: Record<Rank, { text: string; glow: string }> = {
    S: { text: 'text-yellow-300', glow: 'shadow-[0_0_40px_rgba(253,224,71,0.8)]' },
    A: { text: 'text-cyan-300',   glow: 'shadow-[0_0_40px_rgba(103,232,249,0.8)]' },
    B: { text: 'text-green-300',  glow: 'shadow-[0_0_40px_rgba(134,239,172,0.8)]' },
    C: { text: 'text-orange-300', glow: 'shadow-[0_0_40px_rgba(253,186,116,0.8)]' },
    D: { text: 'text-slate-400',  glow: '' },
};

export const ResultScreen = ({ result, totalCoins, onRetry, onShop, onTitle }: ResultScreenProps) => {
    const { score, maxScore, perfect, good, ok, miss, maxCombo, rank, coinsEarned } = result;
    const accuracy = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    const rankStyle = RANK_STYLES[rank];

    return (
        <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/30 pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center gap-6">
                <h2 className="text-2xl font-bold text-white/50 tracking-widest">RESULT</h2>

                {/* ランク */}
                <div className={`text-9xl font-black ${rankStyle.text} ${rankStyle.glow} rounded-2xl w-40 h-40 flex items-center justify-center bg-slate-800/50 border border-white/10`}>
                    {rank}
                </div>

                {/* スコア */}
                <div className="text-center">
                    <div className="text-4xl font-black text-white">{score.toLocaleString()}</div>
                    <div className="text-white/40 text-sm">/ {maxScore.toLocaleString()} ({accuracy}%)</div>
                </div>

                {/* 判定内訳 */}
                <div className="w-full bg-slate-800/60 rounded-2xl border border-white/10 p-5 grid grid-cols-2 gap-3">
                    <div className="flex justify-between items-center">
                        <span className="text-yellow-400 font-bold">PERFECT</span>
                        <span className="text-white font-mono text-lg">{perfect}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-blue-400 font-bold">GOOD</span>
                        <span className="text-white font-mono text-lg">{good}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-green-400 font-bold">OK</span>
                        <span className="text-white font-mono text-lg">{ok}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-red-400 font-bold">MISS</span>
                        <span className="text-white font-mono text-lg">{miss}</span>
                    </div>
                    <div className="col-span-2 border-t border-white/10 pt-3 flex justify-between items-center">
                        <span className="text-white/60 font-bold">MAX COMBO</span>
                        <span className="text-white font-mono text-lg">{maxCombo}</span>
                    </div>
                </div>

                {/* コイン獲得 */}
                <div className="w-full bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-center">
                    {coinsEarned > 0 ? (
                        <>
                            <div className="text-yellow-300 font-black text-2xl">🪙 +{coinsEarned} コイン獲得！</div>
                            <div className="text-yellow-300/60 text-sm mt-1">合計: {totalCoins} コイン</div>
                        </>
                    ) : (
                        <>
                            <div className="text-white/40 font-bold">コイン獲得なし</div>
                            <div className="text-white/30 text-sm mt-1">合計: {totalCoins} コイン</div>
                        </>
                    )}
                </div>

                {/* ボタン */}
                <div className="flex gap-3 w-full">
                    <button
                        onClick={onRetry}
                        className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black rounded-xl transition-all duration-150 hover:scale-105 active:scale-95"
                    >
                        もう一度
                    </button>
                    <button
                        onClick={onShop}
                        className="flex-1 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-yellow-300 font-bold rounded-xl transition-all duration-150 hover:scale-105 active:scale-95"
                    >
                        🛍 ショップ
                    </button>
                    <button
                        onClick={onTitle}
                        className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white/60 font-bold rounded-xl transition-all duration-150 hover:scale-105 active:scale-95"
                    >
                        タイトル
                    </button>
                </div>
            </div>
        </div>
    );
};
