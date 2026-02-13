import { useState } from 'react';
import type { MissionConfig } from '../types';
import { MISSIONS } from '../constants';

interface BriefingScreenProps {
    coins: number;
    currentMission: number; // 解放済み最大ミッションID
    onStart: (mission: MissionConfig) => void;
    onShop: () => void;
}

const RANK_CLEAR_LABEL = 'ランクB以上でクリア';

export const BriefingScreen = ({ coins, currentMission, onStart, onShop }: BriefingScreenProps) => {
    const [selected, setSelected] = useState<number>(currentMission);

    const selectedMission = MISSIONS.find(m => m.id === selected) ?? MISSIONS[0];
    const maxUnlocked = Math.min(currentMission, MISSIONS.length);

    const difficultyStars = (id: number) => {
        const filled = Math.min(id, 7);
        return Array.from({ length: 7 }, (_, i) => i < filled);
    };

    return (
        <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden font-mono">
            {/* スキャンライン背景 */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.015) 2px, rgba(0,255,0,0.015) 4px)' }}
            />

            {/* コイン */}
            <div className="absolute top-4 right-6 bg-yellow-500/20 border border-yellow-500/40 rounded-full px-4 py-1.5 text-yellow-300 font-bold text-sm">
                🪙 {coins}
            </div>

            {/* タイトル */}
            <div className="absolute top-4 left-6 text-green-400/60 text-xs tracking-widest uppercase">
                ▌ COMMAND CENTER
            </div>

            <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col gap-6">
                <h2 className="text-green-400 text-2xl font-black tracking-widest text-center uppercase">
                    — MISSION SELECT —
                </h2>

                <div className="flex gap-4">
                    {/* ミッションリスト */}
                    <div className="flex flex-col gap-2 w-48 shrink-0">
                        {MISSIONS.map(m => {
                            const unlocked = m.id <= maxUnlocked;
                            const isSelected = m.id === selected;
                            return (
                                <button
                                    key={m.id}
                                    disabled={!unlocked}
                                    onClick={() => setSelected(m.id)}
                                    className={`
                                        px-4 py-2.5 text-left text-sm font-bold tracking-wider border transition-all duration-100
                                        ${isSelected
                                            ? 'bg-green-500/20 border-green-400 text-green-300 shadow-[0_0_8px_rgba(74,222,128,0.4)]'
                                            : unlocked
                                                ? 'bg-slate-800/60 border-green-900/60 text-green-400/70 hover:border-green-600 hover:text-green-300'
                                                : 'bg-slate-900/40 border-slate-700/30 text-slate-600 cursor-not-allowed'
                                        }
                                    `}
                                >
                                    {unlocked ? m.label : `${m.label} 🔒`}
                                </button>
                            );
                        })}
                    </div>

                    {/* ミッション詳細パネル */}
                    <div className="flex-1 border border-green-700/40 bg-slate-900/60 rounded p-5 flex flex-col gap-4">
                        {/* ミッションヘッダー */}
                        <div className="border-b border-green-700/30 pb-3">
                            <div className="flex items-center justify-between">
                                <span className="text-green-300 text-3xl font-black tracking-widest">
                                    {selectedMission.label}
                                </span>
                                <span className="text-green-400/50 text-xs">{RANK_CLEAR_LABEL}</span>
                            </div>
                            <p className="text-green-200/70 text-sm mt-1">{selectedMission.description}</p>
                        </div>

                        {/* パラメータ */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="bg-slate-800/50 border border-green-900/40 rounded p-3">
                                <div className="text-green-400/50 text-xs uppercase tracking-wider mb-1">BPM</div>
                                <div className="text-green-300 text-xl font-bold">{selectedMission.bpm}</div>
                            </div>
                            <div className="bg-slate-800/50 border border-green-900/40 rounded p-3">
                                <div className="text-green-400/50 text-xs uppercase tracking-wider mb-1">TARGETS</div>
                                <div className="text-green-300 text-xl font-bold">{selectedMission.wordCount} words</div>
                            </div>
                            <div className="bg-slate-800/50 border border-green-900/40 rounded p-3">
                                <div className="text-green-400/50 text-xs uppercase tracking-wider mb-1">SPEED</div>
                                <div className="text-green-300 text-xl font-bold">{selectedMission.noteSpeed.toFixed(2)} <span className="text-xs">px/ms</span></div>
                            </div>
                            <div className="bg-slate-800/50 border border-green-900/40 rounded p-3">
                                <div className="text-green-400/50 text-xs uppercase tracking-wider mb-1">DIFFICULTY</div>
                                <div className="flex gap-0.5 mt-1">
                                    {difficultyStars(selectedMission.id).map((filled, i) => (
                                        <span key={i} className={`text-base ${filled ? 'text-green-400' : 'text-slate-700'}`}>★</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* クリア条件 */}
                        <div className="text-green-400/40 text-xs tracking-wider border-t border-green-900/30 pt-3">
                            CLEAR CONDITION: RANK B or higher (score ≥ 60%)
                        </div>

                        {/* ボタン */}
                        <div className="flex gap-3 mt-auto">
                            <button
                                onClick={() => onStart(selectedMission)}
                                className="flex-1 py-3 bg-green-500 hover:bg-green-400 text-slate-900 font-black text-lg tracking-widest rounded transition-all duration-100 hover:scale-105 active:scale-95 shadow-[0_0_16px_rgba(74,222,128,0.5)]"
                            >
                                ▶ 出撃
                            </button>
                            <button
                                onClick={onShop}
                                className="px-5 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-yellow-300 font-bold rounded transition-all duration-100 hover:scale-105 active:scale-95"
                            >
                                🛍 SHOP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
