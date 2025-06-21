'use client';
import { locationAtom, mapAtom, settingsAtom, weatherDataAtom } from '@/atoms';
import HomeScreen from '@/components/HomeScreen';
import { useAtomValue, useSetAtom } from 'jotai';
import { MapProvider, Map } from 'react-map-gl/mapbox';
import { useQuery } from '@tanstack/react-query';
import { getAirQuality, getAlerts, getBoundaries, getWeather } from '@/lib/api';
import { WeatherData } from '@/types';
import { useEffect, useState } from 'react';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { isRaining, isSnowing } from '@/lib/utils';
import { PropertyValueSpecification } from 'mapbox-gl';

function zoomBasedReveal(value: number): PropertyValueSpecification<number> {
    return ['interpolate', ['linear'], ['zoom'], 11, 0.0, 13, value];
}

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
            const alert = getAlerts(latitude, longitude);
            const boundaries = getBoundaries(latitude, longitude);
            const [weatherData, airQualityData, alertsData, boundariesData] =
                await Promise.all([weather, aq, alert, boundaries]);

            return {
                ...weatherData,
                aq: airQualityData,
                alert: alertsData,
                boundaries: boundariesData,
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
                    onMove={(e) => {
                        if (data?.boundaries) {
                            const isInside = booleanPointInPolygon(
                                [e.viewState.longitude, e.viewState.latitude],
                                data.boundaries.geometry
                            );

                            if (
                                isInside &&
                                isRaining(data.current.weather_code)
                            ) {
                                e.target.setRain({
                                    density: zoomBasedReveal(0.5),
                                    vignette: zoomBasedReveal(1.0),
                                    intensity: 1,
                                    color: '#919191',
                                    opacity: 0.19,
                                    'center-thinning': 0,
                                    direction: [0, 50],
                                    'droplet-size': [1, 10],
                                    'distortion-strength': 0.5,
                                    'vignette-color': '#6e6e6e',
                                });
                            } else if (
                                isInside &&
                                isSnowing(data.current.weather_code)
                            ) {
                                e.target.setSnow({
                                    density: zoomBasedReveal(0.85),
                                    vignette: zoomBasedReveal(0.3),
                                    intensity: 1,
                                    color: '#FFFFFF',
                                    opacity: 1,
                                    'center-thinning': 0.4,
                                    direction: [0, 50],
                                    'flake-size': 0.71,
                                    'vignette-color': '#FFFFFF',
                                });
                            } else {
                                e.target.setRain(null); // Disable rain if outside boundaries
                                e.target.setSnow(null); // Disable snow if outside boundaries
                            }
                        }
                    }}
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
