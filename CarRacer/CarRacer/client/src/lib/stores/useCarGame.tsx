import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import * as THREE from "three";

export interface CarState {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  velocity: THREE.Vector3;
  speed: number;
  maxSpeed: number;
  acceleration: number;
  turnSpeed: number;
  isOnTrack: boolean;
}

interface GameState {
  gameStarted: boolean;
  score: number;
  lap: number;
  bestLapTime: number;
  currentLapTime: number;
  car: CarState;
  
  // Actions
  startGame: () => void;
  resetGame: () => void;
  updateCar: (updates: Partial<CarState>) => void;
  updateScore: (points: number) => void;
  completeLap: (time: number) => void;
  updateLapTime: (time: number) => void;
}

export const useCarGame = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    gameStarted: true, // Start the game immediately
    score: 0,
    lap: 1,
    bestLapTime: 0,
    currentLapTime: 0,
    
    car: {
      position: new THREE.Vector3(0, 0.5, 0),
      rotation: new THREE.Euler(0, 0, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      speed: 0,
      maxSpeed: 30,
      acceleration: 0.5,
      turnSpeed: 0.03,
      isOnTrack: true,
    },
    
    startGame: () => {
      set({ gameStarted: true });
    },
    
    resetGame: () => {
      set({
        gameStarted: true,
        score: 0,
        lap: 1,
        currentLapTime: 0,
        car: {
          position: new THREE.Vector3(0, 0.5, 0),
          rotation: new THREE.Euler(0, 0, 0),
          velocity: new THREE.Vector3(0, 0, 0),
          speed: 0,
          maxSpeed: 30,
          acceleration: 0.5,
          turnSpeed: 0.03,
          isOnTrack: true,
        }
      });
    },
    
    updateCar: (updates) => {
      set((state) => ({
        car: { ...state.car, ...updates }
      }));
    },
    
    updateScore: (points) => {
      set((state) => ({ score: state.score + points }));
    },
    
    completeLap: (time) => {
      set((state) => ({
        lap: state.lap + 1,
        bestLapTime: state.bestLapTime === 0 ? time : Math.min(state.bestLapTime, time),
        currentLapTime: 0,
        score: state.score + 100
      }));
    },
    
    updateLapTime: (time) => {
      set({ currentLapTime: time });
    }
  }))
);
