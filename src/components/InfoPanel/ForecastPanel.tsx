import { weatherDataAtom } from '@/atoms';
import { useAtomValue } from 'jotai';
import { motion } from 'motion/react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { WEATHER_CODES } from '@/lib/constants';
import { Droplet } from 'lucide-react';

export default function ForecastPanel() {
    const weatherData = useAtomValue(weatherDataAtom);

    return (
        <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: 'backInOut' }}
            className="w-[350px] bg-primary-foreground rounded-md border p-4"
        >
            <h2 className="font-semibold text-sm">16 Day Forecast</h2>
            <div className="h-full mt-2">
                {weatherData?.daily.time.map((time, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[100px_1fr_1fr_1fr] items-center justify-items-end py-2 border-b last:border-b-0 gap-x-2"
                    >
                        <span className="text-sm justify-self-start">
                            {new Date(
                                time + weatherData.timezone_abbreviation
                            ).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 justify-self-start">
                            <Droplet size={10} color="var(--color-sky-500)" />
                            {Math.round(
                                weatherData.daily
                                    .precipitation_probability_mean[index]
                            )}
                            %
                        </span>
                        <span className="text-sm">
                            {Math.round(
                                weatherData.daily.temperature_2m_max[index]
                            )}
                            ° /{' '}
                            {Math.round(
                                weatherData.daily.temperature_2m_min[index]
                            )}
                            °
                        </span>

                        <Tooltip>
                            <TooltipTrigger>
                                <img
                                    src={`/weather/${weatherData.daily.weather_code[index]}.svg`}
                                    className="size-6"
                                    alt="Weather Icon"
                                />
                            </TooltipTrigger>
                            <TooltipContent side="left">
                                {
                                    WEATHER_CODES[
                                        weatherData.daily.weather_code[index]
                                    ]
                                }
                            </TooltipContent>
                        </Tooltip>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
