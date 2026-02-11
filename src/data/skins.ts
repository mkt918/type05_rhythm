export interface SkinItem {
    id: string;
    category: 'noteShape' | 'colorTheme' | 'bgEffect' | 'feedbackStyle';
    value: string;
    name: string;
    price: number;
    preview?: string;
}

export const SKINS: SkinItem[] = [
    // ノーツの形
    { id: 'shape_square',  category: 'noteShape',      value: 'square',   name: '四角ノーツ',       price: 5,  preview: '■' },
    { id: 'shape_diamond', category: 'noteShape',      value: 'diamond',  name: 'ダイヤノーツ',     price: 8,  preview: '◆' },
    // カラーテーマ
    { id: 'theme_neon',    category: 'colorTheme',     value: 'neon',     name: 'ネオンテーマ',     price: 10 },
    { id: 'theme_pastel',  category: 'colorTheme',     value: 'pastel',   name: 'パステルテーマ',   price: 10 },
    // 背景エフェクト
    { id: 'bg_particles',  category: 'bgEffect',       value: 'particles',name: 'パーティクル',     price: 12 },
    // 判定デザイン
    { id: 'fb_retro',      category: 'feedbackStyle',  value: 'retro',    name: 'レトロ判定',       price: 6 },
    { id: 'fb_minimal',    category: 'feedbackStyle',  value: 'minimal',  name: 'ミニマル判定',     price: 6 },
];
