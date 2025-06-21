import { WeatherCode } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function isRaining(weatherCode: WeatherCode) {
    // Open-Meteo weather codes for rain
    const rainCodes = [
        51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99,
    ];
    return rainCodes.includes(weatherCode);
}

export function isSnowing(weatherCode: WeatherCode) {
    // Open-Meteo weather codes for snow
    const snowCodes = [71, 73, 75, 77, 85, 86];
    return snowCodes.includes(weatherCode);
}
