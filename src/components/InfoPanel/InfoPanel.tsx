import { ChartLine, Droplets, Info, Star, Wind } from 'lucide-react';
import SquareButton from '../buttons/SquareButton';
import { AnimatePresence, motion } from 'motion/react';
import Panel from './Panel';
import { useAtomValue } from 'jotai';
import { mapAtom } from '@/atoms';
import { useState } from 'react';
import ForecastPanel from './ForecastPanel';

const ICONS = [
    {
        Icon: Info,
        type: 'info' as const,
    },
    {
        Icon: ChartLine,
        type: 'forecast' as const,
    },
    {
        Icon: Droplets,
        type: 'precipitation' as const,
    },
    {
        Icon: Wind,
        type: 'wind' as const,
    },
];
type PanelType = 'info' | 'forecast' | 'precipitation' | 'wind';

export default function InfoPanel() {
    const { isMoving } = useAtomValue(mapAtom);
    const [panel, setPanel] = useState<PanelType>('info');

    return (
        <AnimatePresence mode="wait">
            {!isMoving && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: 'backInOut' }}
                    className="absolute right-4 top-4 flex gap-2 items-start"
                >
                    <AnimatePresence mode="wait">
                        {panel === 'info' && <Panel key="info-panel" />}
                        {panel === 'forecast' && (
                            <ForecastPanel key="forecast-panel" />
                        )}
                    </AnimatePresence>

                    <nav className="flex flex-col gap-2">
                        <div className="bg-background p-0.5 rounded shadow">
                            <SquareButton>
                                <Star />
                            </SquareButton>
                        </div>

                        <ul className="flex flex-col gap-0.5 bg-background p-0.5 rounded shadow">
                            {ICONS.map(({ Icon, type }) => (
                                <li key={type}>
                                    <SquareButton
                                        active={panel === type}
                                        onClick={() => setPanel(type)}
                                    >
                                        <Icon />
                                    </SquareButton>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
