import { useEffect, useState, useRef, useCallback } from 'react';
import { LANE_CONFIGS, GAME_CONSTANTS } from '../constants';
import type { Note, GameState } from '../types';
import { Lane } from './Lane';
import { Note as NoteComponent } from './Note';
import { KeyboardLayout } from './KeyboardLayout';
import { useGameLoop } from '../hooks/useGameLoop';
import { generateNotes } from '../utils/noteGenerator';
import { playHitSound, initAudio } from '../utils/audio';

const { JUDGEMENT_LINE_Y, HIT_WINDOW } = GAME_CONSTANTS;

const PRACTICE_TEXT = "the quick brown fox jumps over the lazy dog";

export const GameStage = () => {
    const [gameState, setGameState] = useState<GameState>({
        isPlaying: false,
        startTime: 0,
        currentTime: 0,
        score: 0,
        combo: 0,
        maxCombo: 0,
    });

    const [notes, setNotes] = useState<Note[]>([]);
    const [activeLanes, setActiveLanes] = useState<Set<number>>(new Set());
    const [feedback, setFeedback] = useState<{ text: string, color: string } | null>(null);

    const notesRef = useRef<Note[]>([]);
    const gameStateRef = useRef(gameState);
    const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        notesRef.current = notes;
    }, [notes]);

    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    const showFeedback = useCallback((text: string, color: string) => {
        if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
        setFeedback({ text, color });
        feedbackTimerRef.current = setTimeout(() => setFeedback(null), 600);
    }, []);

    const startGame = () => {
        initAudio();
        const initialNotes = generateNotes(PRACTICE_TEXT, 40, 4000, 4000);
        setNotes(initialNotes);
        setGameState({
            isPlaying: true,
            startTime: performance.now(),
            currentTime: 0,
            score: 0,
            combo: 0,
            maxCombo: 0,
        });
        setFeedback(null);
    };

    const gameLoopCallback = useCallback((_deltaTime: number) => {
        const gs = gameStateRef.current;
        if (!gs.isPlaying) return;

        const currentMs = performance.now() - gs.startTime;

        setGameState(prev => ({
            ...prev,
            currentTime: currentMs,
        }));

        const currentNotes = notesRef.current;
        const hasMissed = currentNotes.some(
            note => !note.hit && !note.missed && currentMs > note.targetTime + HIT_WINDOW.MISS
        );

        if (hasMissed) {
            const updatedNotes = currentNotes.map(note => {
                if (!note.hit && !note.missed && currentMs > note.targetTime + HIT_WINDOW.MISS) {
                    return { ...note, missed: true };
                }
                return note;
            });
            notesRef.current = updatedNotes;
            setNotes(updatedNotes);
            showFeedback('MISS', 'text-red-500');
            playHitSound('miss');
            setGameState(prev => ({ ...prev, combo: 0 }));
        }
    }, [showFeedback]);

    useGameLoop(gameLoopCallback, gameState.isPlaying);


    // Input Handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!gameStateRef.current.isPlaying) {
                if (e.code === 'Space') startGame();
                return;
            }

            const key = e.key.toLowerCase();

            const laneConfig = LANE_CONFIGS.find(cfg => cfg.keys.includes(key));
            if (!laneConfig) return;

            const laneId = laneConfig.id;
            setActiveLanes(prev => new Set(prev).add(laneId));

            const currentMs = performance.now() - gameStateRef.current.startTime;

            const candidates = notesRef.current.filter(n =>
                !n.hit && !n.missed &&
                n.lane === laneId &&
                n.char === key &&
                Math.abs(currentMs - n.targetTime) <= HIT_WINDOW.MISS
            );

            if (candidates.length > 0) {
                const target = candidates.reduce((prev, curr) =>
                    Math.abs(currentMs - prev.targetTime) < Math.abs(currentMs - curr.targetTime) ? prev : curr
                );

                const diff = Math.abs(currentMs - target.targetTime);
                let judgement: string;
                let scoreAdd: number;

                if (diff <= HIT_WINDOW.PERFECT) {
                    judgement = 'PERFECT';
                    scoreAdd = 100;
                } else if (diff <= HIT_WINDOW.GOOD) {
                    judgement = 'GOOD';
                    scoreAdd = 50;
                } else {
                    judgement = 'OK';
                    scoreAdd = 10;
                }

                const newNotes = notesRef.current.map(n => n.id === target.id ? { ...n, hit: true } : n);
                notesRef.current = newNotes;
                setNotes(newNotes);

                playHitSound('perfect');
                showFeedback(judgement, judgement === 'PERFECT' ? 'text-yellow-400' : 'text-blue-400');

                setGameState(prev => ({
                    ...prev,
                    score: prev.score + scoreAdd,
                    combo: prev.combo + 1,
                    maxCombo: Math.max(prev.maxCombo, prev.combo + 1)
                }));
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            const laneConfig = LANE_CONFIGS.find(cfg => cfg.keys.includes(key));
            if (laneConfig) {
                setActiveLanes(prev => {
                    const next = new Set(prev);
                    next.delete(laneConfig.id);
                    return next;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className="w-full h-screen bg-slate-900 flex flex-col items-center relative overflow-hidden">

            {/* UI Overlay */}
            <div className="absolute top-4 left-4 text-white z-50">
                <div className="text-xl font-bold">SCORE: {gameState.score}</div>
                <div className="text-xl font-bold">COMBO: {gameState.combo}</div>
            </div>

            {!gameState.isPlaying && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-50 text-center">
                    <h1 className="text-4xl font-bold mb-4">Rhythm Typer</h1>
                    <p className="animate-pulse">Press SPACE to Start</p>
                </div>
            )}

            {/* Hit Feedback */}
            {feedback && (
                <div className={`absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black ${feedback.color} z-50 drop-shadow-lg pointer-events-none`}>
                    {feedback.text}
                </div>
            )}

            {/* Text Progress Display */}
            {gameState.isPlaying && (
                <div className="w-full bg-slate-800/50 py-6 border-b border-white/10 flex justify-center items-center">
                    <div className="text-3xl font-mono tracking-wider flex">
                        {PRACTICE_TEXT.split('').map((char, i) => {
                            // Calculate which notes are hit
                            const hitCount = notes.filter(n => n.hit || n.missed).length;
                            const isPast = i < hitCount;
                            const isCurrent = i === hitCount;

                            return (
                                <span
                                    key={i}
                                    className={`${isPast ? 'text-white/20' : isCurrent ? 'text-cyan-400 border-b-2 border-cyan-400 animate-pulse' : 'text-white'}`}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Stage Container */}
            <div className="relative w-full max-w-5xl h-full flex flex-col border-x border-slate-700 shadow-2xl bg-black/20">

                <div className="relative flex-1 flex">
                    {/* Lanes */}
                    {LANE_CONFIGS.map(config => (
                        <Lane
                            key={config.id}
                            config={config}
                            isActive={activeLanes.has(config.id)}
                        />
                    ))}

                    {/* Judgement Line */}
                    <div
                        className="absolute w-full h-1 bg-cyan-400 shadow-[0_0_10px_cyan] pointer-events-none"
                        style={{ top: `${JUDGEMENT_LINE_Y}%` }}
                    ></div>

                    {/* Notes */}
                    {notes.map(note => {
                        if (note.hit || note.missed) return null;

                        const timeProgress = (gameState.currentTime - note.spawnTime) / (note.targetTime - note.spawnTime);
                        const topPercent = timeProgress * JUDGEMENT_LINE_Y;

                        if (timeProgress < 0 || timeProgress > 1.2) return null;

                        return (
                            <NoteComponent
                                key={note.id}
                                note={note}
                                y={topPercent}
                                colorName={LANE_CONFIGS.find(l => l.id === note.lane)?.color || 'red'}
                            />
                        );
                    })}
                </div>

                {/* Keyboard Layout */}
                <div className="p-4 bg-slate-900 border-t border-white/10">
                    <KeyboardLayout
                        activeLanes={activeLanes}
                        highlightKey={notes.find(n => !n.hit && !n.missed)?.char}
                    />
                </div>
            </div>
        </div>
    );
};
