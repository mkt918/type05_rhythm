import type { PlayerData } from '../types';
import { SKINS } from '../data/skins';

interface ShopScreenProps {
    playerData: PlayerData;
    onPurchase: (skinId: string, price: number, category: string, value: string) => void;
    onEquip: (category: string, value: string) => void;
    onBack: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
    noteShape:     'ノーツの形',
    colorTheme:    'カラーテーマ',
    bgEffect:      '背景エフェクト',
    feedbackStyle: '判定デザイン',
};

const PREVIEW_CHARS: Record<string, string> = {
    shape_square:  '■',
    shape_diamond: '◆',
    theme_neon:    '✦',
    theme_pastel:  '✿',
    bg_particles:  '✦',
    fb_retro:      'Aa',
    fb_minimal:    'a',
};

export const ShopScreen = ({ playerData, onPurchase, onEquip, onBack }: ShopScreenProps) => {
    const categories = [...new Set(SKINS.map(s => s.category))];

    return (
        <div className="w-full h-screen bg-slate-900 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">

                {/* ヘッダー */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="text-white/50 hover:text-white font-bold transition-colors"
                    >
                        ← 戻る
                    </button>
                    <h1 className="text-2xl font-black text-white">SHOP</h1>
                    <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-full px-4 py-1.5 text-yellow-300 font-bold">
                        🪙 {playerData.coins}
                    </div>
                </div>

                {/* カテゴリごとにスキン表示 */}
                {categories.map(category => {
                    const items = SKINS.filter(s => s.category === category);
                    return (
                        <div key={category} className="bg-slate-800/50 border border-white/10 rounded-2xl p-5">
                            <h2 className="text-white/60 text-xs font-bold tracking-widest uppercase mb-4">
                                {CATEGORY_LABELS[category] ?? category}
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {items.map(skin => {
                                    const isOwned = playerData.ownedSkins.includes(skin.id);
                                    const isEquipped = (playerData.equippedSkin as unknown as Record<string, string>)[skin.category] === skin.value;
                                    const canAfford = playerData.coins >= skin.price;

                                    return (
                                        <div
                                            key={skin.id}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                                                isEquipped
                                                    ? 'border-cyan-400 bg-cyan-500/10'
                                                    : 'border-white/10 bg-slate-900/50'
                                            }`}
                                        >
                                            {/* プレビュー */}
                                            <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
                                                {PREVIEW_CHARS[skin.id] ?? '?'}
                                            </div>

                                            <div className="text-white text-sm font-bold text-center">{skin.name}</div>

                                            {isEquipped ? (
                                                <span className="text-cyan-400 text-xs font-bold border border-cyan-400/40 rounded px-2 py-0.5">
                                                    装備中
                                                </span>
                                            ) : isOwned ? (
                                                <button
                                                    onClick={() => onEquip(skin.category, skin.value)}
                                                    className="text-xs font-bold px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded transition-colors"
                                                >
                                                    装備する
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => canAfford && onPurchase(skin.id, skin.price, skin.category, skin.value)}
                                                    disabled={!canAfford}
                                                    className={`text-xs font-bold px-3 py-1 rounded transition-all ${
                                                        canAfford
                                                            ? 'bg-yellow-500 hover:bg-yellow-400 text-slate-900 hover:scale-105 active:scale-95'
                                                            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                                    }`}
                                                >
                                                    🪙 {skin.price}
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
