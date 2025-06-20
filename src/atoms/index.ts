import { Location, Settings, WeatherData } from '@/types';
import { atom } from 'jotai';

export const mapAtom = atom({
    isMoving: false,
});

export const weatherDataAtom = atom<WeatherData | null>(null);

export const settingsAtom = atom<Settings>({
    temperature: 'fahrenheit',
    windSpeed: 'kmh',
    precipitation: 'mm',
});

export const locationAtom = atom<Location | null>({
    id: 'dXJuOm1ieHBsYzpDM2ZvN0E',
    name: 'Los Angeles, California, United States',
    latitude: 34.048051,
    longitude: -118.254187,
});
