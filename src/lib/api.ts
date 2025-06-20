import { Settings } from '@/types';

export async function getGeocoding(q: string) {
    const params = new URLSearchParams({
        q,
    });

    try {
        const response = await fetch(`/api/geocoding?${params.toString()}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
        throw error;
    }
}

export async function getBoundaries(lat: number, lng: number) {
    const params = new URLSearchParams({
        lat: String(lat),
        lon: String(lng),
        apiKey: process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY || '',
        geometry: 'geometry_1000',
    });
    try {
        const response = await fetch(
            `https://api.geoapify.com/v1/boundaries/part-of?${params.toString()}`
        );
        return await response.json();
    } catch (error) {
        console.error('Error fetching boundaries data:', error);
        throw error;
    }
}

export async function getWeather(lat: number, lng: number, settings: Settings) {
    const params = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lng),
        current: [
            'weather_code',
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'wind_speed_10m',
            'wind_direction_10m',
            'surface_pressure',
            'precipitation',
            'precipitation_probability',
            'visibility',
            'is_day',
        ].toString(),
        daily: [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min',
            'temperature_2m_mean',
            'uv_index_max',
            'precipitation_probability_mean',
        ].toString(),
        hourly: ['temperature_2m'].toString(),
        minutely: ['temperature_2m'].toString(),
        forecast_days: '16',
        temperature_unit: settings.temperature,
        wind_speed_unit: settings.windSpeed,
        precipitation_unit: settings.precipitation,
        timezone: 'auto',
    });

    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?${params.toString()}`
        );
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

export async function getAirQuality(lat: number, lng: number) {
    const params = new URLSearchParams({
        latitude: String(lat),
        longitude: String(lng),
        current: 'uv_index,uv_index_clear_sky,us_aqi',
    });

    try {
        const response = await fetch(
            `https://air-quality-api.open-meteo.com/v1/air-quality?${params.toString()}`
        );
        return await response.json();
    } catch (error) {
        console.error('Error fetching air quality data:', error);
        throw error;
    }
}
