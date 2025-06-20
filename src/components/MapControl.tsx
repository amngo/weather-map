import { useMap } from 'react-map-gl/mapbox';
import SquareButton from './buttons/SquareButton';
import { Maximize, Minimize, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function MapControl() {
    const map = useMap();
    const [fullscreen, setFullscreen] = useState(false);

    const handleZoomIn = () => {
        if (map.current) {
            map.current.zoomIn();
        }
    };
    const handleZoomOut = () => {
        if (map.current) {
            map.current.zoomOut();
        }
    };

    const handleFullscreen = async () => {
        try {
            if (!fullscreen) {
                const el = document.getElementById('main-content');
                if (el) {
                    await el.requestFullscreen();
                    setFullscreen(true);
                }
            } else {
                if (document.fullscreenElement) {
                    await document.exitFullscreen();
                    setFullscreen(false);
                }
            }
        } catch (error) {
            console.error('Error maximizing map:', error);
            setFullscreen(false);
        }
    };

    return (
        <div className="bottom-6 right-4 flex flex-col absolute gap-2">
            <div className="flex flex-col bg-primary-foreground rounded shadow p-0.5">
                <SquareButton onClick={handleZoomIn}>
                    <Plus />
                </SquareButton>
                <SquareButton onClick={handleZoomOut}>
                    <Minus />
                </SquareButton>
            </div>

            <div className="bg-primary-foreground rounded shadow p-0.5">
                <SquareButton onClick={handleFullscreen}>
                    {fullscreen ? <Minimize /> : <Maximize />}
                </SquareButton>
            </div>
        </div>
    );
}
