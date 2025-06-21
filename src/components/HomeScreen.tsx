import 'mapbox-gl/dist/mapbox-gl.css';
import InfoPanel from './InfoPanel/InfoPanel';
import MapControl from './MapControl';
import Settings from './Settings';
import LocationSearch from './LocationSearch';
import Favorites from './Favorites';
import ActiveAlert from './ActiveAlert';
import { Layer, Source } from 'react-map-gl/mapbox';
import { weatherDataAtom } from '@/atoms';
import { useAtomValue } from 'jotai';

export default function HomeScreen() {
    const weatherData = useAtomValue(weatherDataAtom);

    if (!weatherData) {
        return null;
    }

    return (
        <>
            <div className="grid grid-cols-3 items-center w-full gap-2 absolute top-0 left-0 bg-background/85 backdrop-blur py-2 px-4 z-10">
                <h1 className="justify-self-start">Weather Map</h1>
                <LocationSearch />
                <div className="flex gap-2 justify-self-end">
                    <Favorites />
                    <Settings />
                </div>
            </div>

            {weatherData.boundaries && (
                <Source
                    id="boundary"
                    type="geojson"
                    data={weatherData.boundaries}
                >
                    <Layer
                        id="boundary-3"
                        type="line"
                        source="boundary"
                        layout={{
                            'line-join': 'round',
                            'line-cap': 'round',
                        }}
                        paint={{
                            'line-color': '#e0f2fe',
                            'line-width': 3,
                            'line-emissive-strength': 1.5,
                            'line-opacity': 1,
                        }}
                    />
                    <Layer
                        id="boundary-2"
                        type="line"
                        source="boundary"
                        layout={{
                            'line-join': 'round',
                            'line-cap': 'round',
                        }}
                        paint={{
                            'line-color': '#7dd3fc',
                            'line-width': 6,
                            'line-emissive-strength': 1.5,
                            'line-opacity': 0.5,
                            'line-blur': 4,
                        }}
                    />
                    <Layer
                        id="boundary"
                        type="line"
                        source="boundary"
                        layout={{
                            'line-join': 'round',
                            'line-cap': 'round',
                        }}
                        paint={{
                            'line-color': '#0ea5e9',
                            'line-width': 12,
                            'line-emissive-strength': 1.5,
                            'line-opacity': 0.5,
                            'line-blur': 4,
                        }}
                    />
                </Source>
            )}

            <InfoPanel />
            <MapControl />
            <ActiveAlert />
        </>
    );
}
