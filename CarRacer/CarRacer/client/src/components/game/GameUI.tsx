import { useEffect, useState } from "react";
import { useCarGame } from "../../lib/stores/useCarGame";
import { useAudio } from "../../lib/stores/useAudio";

export function GameUI() {
  const { car, score, lap, bestLapTime, currentLapTime, updateLapTime, resetGame } = useCarGame();
  const { toggleMute, isMuted } = useAudio();
  const [startTime] = useState(Date.now());
  
  // Update lap time
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      updateLapTime(elapsed);
    }, 100);
    
    return () => clearInterval(interval);
  }, [startTime, updateLapTime]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return `${mins}:${secs.padStart(4, '0')}`;
  };
  
  const speedKmh = Math.round(car.speed * 3.6); // Convert to km/h approximately

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Main HUD */}
      <div className="absolute top-4 left-4 bg-black/70 text-white p-4 rounded-lg min-w-[200px]">
        <div className="space-y-2">
          <div className="text-2xl font-bold">
            Speed: {speedKmh} km/h
          </div>
          <div className="text-lg">
            Lap: {lap}
          </div>
          <div className="text-sm">
            Time: {formatTime(currentLapTime)}
          </div>
          {bestLapTime > 0 && (
            <div className="text-sm text-green-400">
              Best: {formatTime(bestLapTime)}
            </div>
          )}
          <div className="text-sm">
            Score: {score}
          </div>
        </div>
      </div>
      
      {/* Controls help */}
      <div className="absolute top-4 right-4 bg-black/70 text-white p-4 rounded-lg">
        <div className="text-sm space-y-1">
          <div className="font-bold mb-2">Controls:</div>
          <div>W/↑ - Forward</div>
          <div>S/↓ - Backward</div>
          <div>A/← - Turn Left</div>
          <div>D/→ - Turn Right</div>
          <div>Space - Brake</div>
        </div>
      </div>
      
      {/* Bottom controls */}
      <div className="absolute bottom-4 left-4 space-x-4 pointer-events-auto">
        <button
          onClick={resetGame}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Reset Game
        </button>
        <button
          onClick={toggleMute}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {isMuted ? "🔇 Unmute" : "🔊 Mute"}
        </button>
      </div>
      
      {/* Speed indicator */}
      <div className="absolute bottom-4 right-4 bg-black/70 text-white p-3 rounded-lg">
        <div className="text-center">
          <div className="text-xs text-gray-300">SPEED</div>
          <div className="text-3xl font-bold">{speedKmh}</div>
          <div className="text-xs text-gray-300">KM/H</div>
        </div>
      </div>
      
      {/* Position indicator */}
      <div className="absolute bottom-20 left-4 bg-black/70 text-white p-2 rounded-lg text-xs">
        <div>X: {car.position?.x.toFixed(1) || 0}</div>
        <div>Z: {car.position?.z.toFixed(1) || 0}</div>
      </div>
    </div>
  );
}
