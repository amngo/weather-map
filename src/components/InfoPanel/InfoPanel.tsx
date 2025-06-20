import { ChartLine, Info, Star } from 'lucide-react';
import SquareButton from '../buttons/SquareButton';
import { AnimatePresence, motion } from 'motion/react';
import Panel from './Panel';
import { useAtomValue } from 'jotai';
import { locationAtom, mapAtom } from '@/atoms';
import { useEffect, useState } from 'react';
import ForecastPanel from './ForecastPanel';

const ICONS = [
    {
        Icon: Info,
        type: 'info' as const,
        label: 'Info',
    },
    {
        Icon: ChartLine,
        type: 'forecast' as const,
        label: 'Forecast',
    },
    // {
    //     Icon: Droplets,
    //     type: 'precipitation' as const,
    //     label: 'Precipitation',
    // },
    // {
    //     Icon: Wind,
    //     type: 'wind' as const,
    //     label: 'Wind',
    // },
];
type PanelType = 'info' | 'forecast' | 'precipitation' | 'wind';

export default function InfoPanel() {
    const location = useAtomValue(locationAtom);
    const [favorite, setFavorite] = useState(false);
    const { isMoving } = useAtomValue(mapAtom);
    const [panel, setPanel] = useState<PanelType>('info');

    const handleAddToFavorites = () => {
        if (location) {
            // Add to local storage
            const favorites = JSON.parse(
                localStorage.getItem('favorites') || '[]'
            );
            const isFavorite = favorites.some(
                (fav: { id: string | number }) => fav.id === location.id
            );
            if (isFavorite) {
                // Remove from favorites
                const updatedFavorites = favorites.filter(
                    (fav: { id: string | number }) => fav.id !== location.id
                );
                localStorage.setItem(
                    'favorites',
                    JSON.stringify(updatedFavorites)
                );
                setFavorite(false);
            } else {
                // Add to favorites
                favorites.push({
                    id: location.id,
                    name: location.name,
                    latitude: location.latitude,
                    longitude: location.longitude,
                });
                localStorage.setItem('favorites', JSON.stringify(favorites));
                setFavorite(true);
            }
        }
    };

    useEffect(() => {
        // Check if the current location is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isFavorite = favorites.some(
            (fav: { id: string | number }) => fav.id === location?.id
        );
        setFavorite(isFavorite);
    }, [location]);

    return (
        <AnimatePresence mode="wait">
            {!isMoving && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: 'backInOut' }}
                    className="absolute right-4 top-16 flex gap-2 items-start"
                >
                    <AnimatePresence mode="wait">
                        {panel === 'info' && <Panel key="info-panel" />}
                        {panel === 'forecast' && (
                            <ForecastPanel key="forecast-panel" />
                        )}
                    </AnimatePresence>

                    <div className="flex flex-col gap-2">
                        <div className="bg-primary-foreground p-0.5 rounded shadow">
                            <SquareButton onClick={handleAddToFavorites}>
                                {favorite ? (
                                    <Star
                                        fill="var(--color-yellow-200)"
                                        stroke="var(--color-yellow-300)"
                                    />
                                ) : (
                                    <Star />
                                )}
                            </SquareButton>
                        </div>

                        <div className="flex flex-col gap-0.5 bg-primary-foreground p-0.5 rounded shadow">
                            {ICONS.map(({ Icon, type }) => (
                                <div key={type}>
                                    <SquareButton
                                        active={panel === type}
                                        onClick={() => setPanel(type)}
                                    >
                                        <Icon />
                                    </SquareButton>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
