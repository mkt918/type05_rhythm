import { useState } from 'react';
import type { Screen, ResultData, PlayerData, MissionConfig } from './types';
import { MISSIONS } from './constants';
import { loadPlayerData, savePlayerData } from './utils/storage';
import { GameStage } from './components/GameStage';
import { TitleScreen } from './components/TitleScreen';
import { ResultScreen } from './components/ResultScreen';
import { ShopScreen } from './components/ShopScreen';
import { BriefingScreen } from './components/BriefingScreen';

const CLEAR_RANKS = ['S', 'A', 'B'];

function App() {
    const [screen, setScreen] = useState<Screen>('title');
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const [playerData, setPlayerData] = useState<PlayerData>(() => loadPlayerData());
    const [selectedMission, setSelectedMission] = useState<MissionConfig>(MISSIONS[0]);

    const handleGameEnd = (result: ResultData) => {
        const cleared = CLEAR_RANKS.includes(result.rank);
        const newCurrentMission = cleared
            ? Math.max(playerData.currentMission, Math.min(selectedMission.id + 1, MISSIONS.length))
            : playerData.currentMission;

        const newPlayerData: PlayerData = {
            ...playerData,
            coins: playerData.coins + result.coinsEarned,
            currentMission: newCurrentMission,
        };
        setPlayerData(newPlayerData);
        savePlayerData(newPlayerData);
        setResultData(result);
        setScreen('result');
    };

    const handleStartMission = (mission: MissionConfig) => {
        setSelectedMission(mission);
        setScreen('game');
    };

    const handleNextMission = () => {
        const next = MISSIONS.find(m => m.id === selectedMission.id + 1);
        if (next) {
            setSelectedMission(next);
            setScreen('game');
        } else {
            setScreen('briefing');
        }
    };

    const handlePurchase = (skinId: string, price: number, category: string, value: string) => {
        const newPlayerData: PlayerData = {
            ...playerData,
            coins: playerData.coins - price,
            ownedSkins: [...playerData.ownedSkins, skinId],
            equippedSkin: { ...playerData.equippedSkin, [category]: value },
        };
        setPlayerData(newPlayerData);
        savePlayerData(newPlayerData);
    };

    const handleEquip = (category: string, value: string) => {
        const newPlayerData: PlayerData = {
            ...playerData,
            equippedSkin: { ...playerData.equippedSkin, [category]: value },
        };
        setPlayerData(newPlayerData);
        savePlayerData(newPlayerData);
    };

    return (
        <>
            {screen === 'title' && (
                <TitleScreen
                    coins={playerData.coins}
                    onStart={() => setScreen('briefing')}
                    onShop={() => setScreen('shop')}
                />
            )}
            {screen === 'briefing' && (
                <BriefingScreen
                    coins={playerData.coins}
                    currentMission={playerData.currentMission}
                    onStart={handleStartMission}
                    onShop={() => setScreen('shop')}
                />
            )}
            {screen === 'game' && (
                <GameStage
                    skin={playerData.equippedSkin}
                    mission={selectedMission}
                    onGameEnd={handleGameEnd}
                />
            )}
            {screen === 'result' && resultData && (
                <ResultScreen
                    result={resultData}
                    totalCoins={playerData.coins}
                    missionId={selectedMission.id}
                    onRetry={() => setScreen('game')}
                    onBriefing={() => setScreen('briefing')}
                    onNextMission={handleNextMission}
                    onShop={() => setScreen('shop')}
                />
            )}
            {screen === 'shop' && (
                <ShopScreen
                    playerData={playerData}
                    onPurchase={handlePurchase}
                    onEquip={handleEquip}
                    onBack={() => setScreen(resultData ? 'result' : 'briefing')}
                />
            )}
        </>
    );
}

export default App;
