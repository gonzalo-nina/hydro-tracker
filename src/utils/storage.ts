import { User, WaterLog } from '../types';

export const StorageKeys = {
  USER: 'hydrotracker_user',
  LOGS_PREFIX: 'hydrotracker_logs_'
};

export const storage = {
  getUser: (): User | null => {
    const data = localStorage.getItem(StorageKeys.USER);
    return data ? JSON.parse(data) : null;
  },
  
  setUser: (user: User): void => {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
  },
  
  getLogs: (username: string): WaterLog[] => {
    const data = localStorage.getItem(StorageKeys.LOGS_PREFIX + username);
    return data ? JSON.parse(data) : [];
  },
  
  setLogs: (username: string, logs: WaterLog[]): void => {
    localStorage.setItem(StorageKeys.LOGS_PREFIX + username, JSON.stringify(logs));
  },

  clearUser: (): void => {
    localStorage.removeItem(StorageKeys.USER);
  }
};