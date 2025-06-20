import 'mapbox-gl/dist/mapbox-gl.css';
import InfoPanel from './InfoPanel/InfoPanel';
import MapControl from './MapControl';
import Settings from './Settings';
import LocationSearch from './LocationSearch';
import Favorites from './Favorites';

export default function HomeScreen() {
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
            <InfoPanel />
            <MapControl />
        </>
    );
}
