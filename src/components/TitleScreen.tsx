import { useEffect } from 'react';

interface TitleScreenProps {
    coins: number;
    onStart: () => void;
    onShop: () => void;
}

export const TitleScreen = ({ coins, onStart, onShop }: TitleScreenProps) => {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.code === 'Space') onStart(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onStart]);

    return (
        <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
            {/* 背景グラデーション */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/50 via-slate-900 to-slate-950 pointer-events-none" />

            {/* コイン表示 */}
            <div className="absolute top-6 right-6 bg-yellow-500/20 border border-yellow-500/40 rounded-full px-4 py-2 text-yellow-300 font-bold text-lg">
                🪙 {coins}
            </div>

            <div className="relative z-10 text-center flex flex-col items-center gap-8">
                <div>
                    <h1 className="text-6xl font-black text-white tracking-widest mb-2">
                        RHYTHM
                    </h1>
                    <h1 className="text-6xl font-black text-cyan-400 tracking-widest">
                        TYPER
                    </h1>
                    <p className="text-white/40 mt-3 text-sm tracking-widest">TYPE THE WORDS TO THE BEAT</p>
                </div>

                <div className="flex flex-col items-center gap-4 mt-4">
                    <button
                        onClick={onStart}
                        className="px-12 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black text-xl rounded-xl transition-all duration-150 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                    >
                        PLAY
                    </button>
                    <p className="text-white/30 text-sm animate-pulse">or press SPACE</p>

                    <button
                        onClick={onShop}
                        className="px-8 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-yellow-300 font-bold text-base rounded-xl transition-all duration-150 hover:scale-105 active:scale-95"
                    >
                        🛍 SHOP
                    </button>
                </div>
            </div>
        </div>
    );
};
