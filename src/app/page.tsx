'use client';
import { locationAtom, mapAtom, settingsAtom, weatherDataAtom } from '@/atoms';
import HomeScreen from '@/components/HomeScreen';
import { useAtomValue, useSetAtom } from 'jotai';
import { MapProvider, Map } from 'react-map-gl/mapbox';
import { useQuery } from '@tanstack/react-query';
import { getAirQuality, getWeather } from '@/lib/api';
import { WeatherData } from '@/types';
import { useEffect, useState } from 'react';

export default function Home() {
    const [mapLoaded, setMapLoaded] = useState(false);
    const setMap = useSetAtom(mapAtom);
    const setWeatherData = useSetAtom(weatherDataAtom);
    const settings = useAtomValue(settingsAtom);
    const location = useAtomValue(locationAtom);

    const { data } = useQuery({
        enabled: !!location,
        queryKey: [
            'weatherData',
            location?.latitude,
            location?.longitude,
            settings,
        ],
        queryFn: async (): Promise<WeatherData | null> => {
            if (!location) {
                return null;
            }

            const { latitude, longitude } = location;
            const weather = getWeather(latitude, longitude, settings);
            const aq = getAirQuality(latitude, longitude);
            // const boundaries = getBoundaries(latitude, longitude);
            const [weatherData, airQualityData] = await Promise.all([
                weather,
                aq,
            ]);

            return {
                ...weatherData,
                aq: airQualityData,
            };
        },
    });

    const handleMapLoad = () => {
        setMapLoaded(true);
    };

    const handleMapMoveStart = () => {
        setMap((prev) => ({
            ...prev,
            isMoving: true,
        }));
    };
    const handleMapMoveEnd = () => {
        setMap((prev) => ({
            ...prev,
            isMoving: false,
        }));
    };

    useEffect(() => {
        if (data) {
            console.log('Weather data:', data);
            setWeatherData(data);
        }
    }, [data, setWeatherData]);

    return (
        <div id="main-content" className="w-screen h-screen relative">
            <MapProvider>
                <Map
                    onLoad={handleMapLoad}
                    onMoveStart={handleMapMoveStart}
                    onMoveEnd={handleMapMoveEnd}
                    mapboxAccessToken={
                        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
                    }
                    initialViewState={{
                        longitude: 0,
                        latitude: 0,
                        zoom: 0,
                        pitch: 70,
                        bearing: 0,
                    }}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="mapbox://styles/amngo96/cmc3b1uem004901sr78cwgpi3"
                >
                    {mapLoaded && <HomeScreen />}
                </Map>
            </MapProvider>
        </div>
    );
}
