import { TriangleAlert, X } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { useAtomValue } from 'jotai';
import { mapAtom, weatherDataAtom } from '@/atoms';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { AnimatePresence, motion } from 'motion/react';

function formatWeatherAlert(alert: string) {
    const sections = [
        { key: '* WHAT...', title: 'What to expect' },
        { key: '* WHERE...', title: 'Location' },
        { key: '* WHEN...', title: 'Time' },
        { key: '* IMPACTS...', title: 'Impacts' },
        { key: '* ADDITIONAL DETAILS...', title: 'Additional Details' },
    ];

    const result = [];

    for (let i = 0; i < sections.length; i++) {
        const start = alert.indexOf(sections[i].key);
        const end =
            i + 1 < sections.length
                ? alert.indexOf(sections[i + 1].key)
                : alert.length;

        if (start !== -1 && end !== -1) {
            const description = alert
                .substring(start + sections[i].key.length, end)
                .trim()
                .replace(/\s+/g, ' '); // Normalize whitespace

            result.push({
                title: sections[i].title,
                description,
            });
        }
    }

    return result;
}
export default function ActiveAlert() {
    const weatherData = useAtomValue(weatherDataAtom);
    const [open, setOpen] = useState(true);
    const { isMoving } = useAtomValue(mapAtom);

    useEffect(() => {
        if (weatherData && weatherData.alert) {
            setOpen(true); // Open alert if there are active alerts
        } else {
            setOpen(false); // Close alert if no active alerts
        }

        return () => {
            setOpen(false); // Cleanup on unmount
        };
    }, [weatherData]);

    if (!weatherData || !weatherData.alert) {
        return null; // No active alerts
    }

    const formattedAlert = formatWeatherAlert(
        weatherData.alert.properties.description
    );

    return (
        <div className="absolute top-16 left-1/2 -translate-x-1/2">
            <AnimatePresence mode="wait">
                {open && !isMoving && (
                    <motion.div
                        key={weatherData.alert.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: 'backInOut' }}
                        className="relative"
                    >
                        <Button
                            variant="ghost"
                            className="absolute top-1 right-1 z-10"
                            onClick={() => setOpen(false)}
                        >
                            <X />
                        </Button>
                        <Alert
                            variant={weatherData.alert.properties.severity}
                            className="w-xl"
                        >
                            <TriangleAlert />
                            <AlertTitle className="mb-2">
                                {weatherData.alert.properties.event}
                            </AlertTitle>
                            <AlertDescription>
                                <p className="text-xs font-light">
                                    <strong>Severity:</strong>{' '}
                                    {weatherData.alert.properties.severity}
                                </p>
                                {formattedAlert.map((section) => (
                                    <p
                                        key={section.title}
                                        className="text-xs font-light"
                                    >
                                        <strong>{section.title}:</strong>{' '}
                                        {section.description}
                                    </p>
                                ))}
                                <p className="text-xs font-light">
                                    <strong>Instructions:</strong>{' '}
                                    {weatherData.alert.properties.instruction}
                                </p>
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
