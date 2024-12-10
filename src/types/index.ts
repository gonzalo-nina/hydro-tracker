// src/types/index.ts - Añadir flag para usuarios nuevos
export interface User {
  username: string;
  dailyGoal: number;
  isNewUser?: boolean;
}

export interface WaterLog {
  amount: number;
  timestamp: number;
  id: string;
}