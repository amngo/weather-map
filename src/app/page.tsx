'use client';

import { mapAtom } from '@/atoms';
import SettingsButton from '@/components/buttons/SettingsButton';
import HomeScreen from '@/components/HomeScreen';
import LocationInput from '@/components/LocationInput';
import { useSetAtom } from 'jotai';
import { MapProvider, Map } from 'react-map-gl/mapbox';

export default function Home() {
    const setMap = useSetAtom(mapAtom);

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

    return (
        <div
            id="main-content"
            className="p-4 w-screen h-screen bg-background flex flex-col gap-4 items-center"
        >
            <div className="grid grid-cols-3 items-center justify-items-center w-full gap-2">
                <h1>Weather Map</h1>
                <LocationInput />
                <SettingsButton />
            </div>

            <div className="w-full h-full rounded-xl overflow-hidden shadow">
                <MapProvider>
                    <Map
                        onMoveStart={handleMapMoveStart}
                        onMoveEnd={handleMapMoveEnd}
                        mapboxAccessToken={
                            process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
                        }
                        initialViewState={{
                            longitude: -118.2437,
                            latitude: 34.0522,
                            zoom: 15,
                            pitch: 70,
                            bearing: 0,
                        }}
                        style={{ width: '100%', height: '100%' }}
                        mapStyle="mapbox://styles/mapbox/standard"
                    >
                        <HomeScreen />
                    </Map>
                </MapProvider>
            </div>
        </div>
    );
}
