import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const storageAdapter = {
    getItem: (key: string) => {
        if (Platform.OS === 'web') {
            if (typeof localStorage !== 'undefined') {
                return localStorage.getItem(key);
            }
            return null;
        }
        return AsyncStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
        if (Platform.OS === 'web') {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(key, value);
            }
            return Promise.resolve();
        }
        return AsyncStorage.setItem(key, value);
    },
    removeItem: (key: string) => {
        if (Platform.OS === 'web') {
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem(key);
            }
            return Promise.resolve();
        }
        return AsyncStorage.removeItem(key);
    },
};