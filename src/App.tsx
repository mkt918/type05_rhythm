import { useState } from 'react';
import type { Screen, ResultData, PlayerData } from './types';
import { loadPlayerData, savePlayerData } from './utils/storage';
import { GameStage } from './components/GameStage';
import { TitleScreen } from './components/TitleScreen';
import { ResultScreen } from './components/ResultScreen';
import { ShopScreen } from './components/ShopScreen';

function App() {
    const [screen, setScreen] = useState<Screen>('title');
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const [playerData, setPlayerData] = useState<PlayerData>(() => loadPlayerData());

    const handleGameEnd = (result: ResultData) => {
        const newPlayerData: PlayerData = {
            ...playerData,
            coins: playerData.coins + result.coinsEarned,
        };
        setPlayerData(newPlayerData);
        savePlayerData(newPlayerData);
        setResultData(result);
        setScreen('result');
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
                    onStart={() => setScreen('game')}
                    onShop={() => setScreen('shop')}
                />
            )}
            {screen === 'game' && (
                <GameStage
                    skin={playerData.equippedSkin}
                    onGameEnd={handleGameEnd}
                />
            )}
            {screen === 'result' && resultData && (
                <ResultScreen
                    result={resultData}
                    totalCoins={playerData.coins}
                    onRetry={() => setScreen('game')}
                    onShop={() => setScreen('shop')}
                    onTitle={() => setScreen('title')}
                />
            )}
            {screen === 'shop' && (
                <ShopScreen
                    playerData={playerData}
                    onPurchase={handlePurchase}
                    onEquip={handleEquip}
                    onBack={() => setScreen(resultData ? 'result' : 'title')}
                />
            )}
        </>
    );
}

export default App;
