import { Layer, Marker, useMap } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Circle from './Circle/Circle';
import InfoPanel from './InfoPanel/InfoPanel';
import MapControl from './MapControl';

const CITY_COORDS = [
    { name: 'New York', lat: 40.7128, lng: -74.006, weatherCode: 0 },
    { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, weatherCode: 1 },
    { name: 'Chicago', lat: 41.8781, lng: -87.6298, weatherCode: 2 },
    { name: 'Houston', lat: 29.7604, lng: -95.3698, weatherCode: 3 },
    { name: 'Phoenix', lat: 33.4484, lng: -112.074, weatherCode: 2 },
    { name: 'Philadelphia', lat: 39.9526, lng: -75.1652, weatherCode: 2 },
    { name: 'San Antonio', lat: 29.4241, lng: -98.4936, weatherCode: 2 },
    { name: 'San Diego', lat: 32.7157, lng: -117.1611, weatherCode: 3 },
    { name: 'Dallas', lat: 32.7767, lng: -96.797, weatherCode: 1 },
    { name: 'San Jose', lat: 37.3382, lng: -121.8863, weatherCode: 0 },
    { name: 'Austin', lat: 30.2672, lng: -97.7431, weatherCode: 1 },
    { name: 'Jacksonville', lat: 30.3322, lng: -81.6557, weatherCode: 2 },
    { name: 'Fort Worth', lat: 32.7555, lng: -97.3308, weatherCode: 3 },
    { name: 'Columbus', lat: 39.9612, lng: -82.9988, weatherCode: 0 },
    { name: 'Charlotte', lat: 35.2271, lng: -80.8431, weatherCode: 1 },
    { name: 'San Francisco', lat: 37.7749, lng: -122.4194, weatherCode: 2 },
];

export default function HomeScreen() {
    const { current: map } = useMap();
    const [selectedCity, setSelectedCity] = useState(null);

    if (!map) {
        return null; // Ensure map is loaded before rendering
    }

    // map.setConfigProperty('basemap', 'lightPreset', 'night');

    const layer = {
        id: 'add-3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 13,
        paint: {
            'fill-extrusion-color': '#1f2937',
            'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                13,
                0,
                13.05,
                ['get', 'height'],
            ],
            'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                13,
                0,
                13.05,
                ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.75,
        },
    };

    const moveCamera = (lat: number, lng: number) => {
        if (map) {
            map.flyTo({ center: [lng, lat], zoom: 15, speed: 4, curve: 1 });
        }
    };

    const handleMarkerClick = (city) => {
        setSelectedCity(city);
        moveCamera(city.lat, city.lng);
    };

    return (
        <>
            {CITY_COORDS.map((city) => (
                <Marker
                    key={city.name}
                    longitude={city.lng}
                    latitude={city.lat}
                    anchor="center"
                    onClick={() => {
                        handleMarkerClick(city);
                    }}
                >
                    <img
                        src={`/weather/${city.weatherCode}.svg`}
                        alt={city.name}
                        className="w-10 h-10"
                    />
                </Marker>
            ))}
            <AnimatePresence>
                {selectedCity && (
                    <Marker
                        anchor="center"
                        key={selectedCity.name}
                        longitude={selectedCity.lng}
                        latitude={selectedCity.lat}
                    >
                        <Circle />
                    </Marker>
                )}
            </AnimatePresence>
            {/* <Layer {...layer} /> */}
            <InfoPanel />
            <MapControl />
        </>
    );
}
