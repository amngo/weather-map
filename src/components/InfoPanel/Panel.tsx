import { motion } from 'motion/react';
import AQI from './AQI';
import UV from './UV';
import Wind from './Wind';
import Humidity from './Humidity';
import Visibility from './Visibility';
import MiniForcast from './MiniForecast';
import { useAtomValue } from 'jotai';
import { locationAtom, weatherDataAtom } from '@/atoms';
import { WEATHER_CODES } from '@/lib/constants';

export default function Panel() {
    const weatherData = useAtomValue(weatherDataAtom);
    const location = useAtomValue(locationAtom);
    const datetime = new Date().toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: weatherData?.timezone,
    });

    if (!weatherData) {
        return null;
    }

    return (
        <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: 'backInOut' }}
            className="grid grid-cols-3 w-[350px] bg-primary-foreground border rounded-md p-4"
        >
            <h2 className="font-semibold text-sm col-span-3 truncate">
                {location?.name}
            </h2>

            <div className="col-span-2">
                <div className="text-xs text-muted-foreground">{datetime}</div>
                <div className="text-4xl my-1">
                    {Math.round(weatherData.current.temperature_2m)}°
                </div>
                <div className="text-lg">
                    {WEATHER_CODES[weatherData.current.weather_code]}
                </div>
                <div className="text-sm">
                    Feels like{' '}
                    {Math.round(weatherData.current.apparent_temperature)}°
                </div>
            </div>
            <img
                src={`/weather/${weatherData.current.weather_code}.svg`}
                className="size-24 self-center justify-self-end"
            />

            <div className="grid grid-cols-2 mt-2 gap-1.5 col-span-3">
                <MiniForcast />
                <Humidity value={weatherData.current.relative_humidity_2m} />
                <AQI value={weatherData.aq.current.us_aqi} />
                <UV value={weatherData.aq.current.uv_index} />
                <Wind
                    value={weatherData.current.wind_speed_10m}
                    direction={weatherData.current.wind_direction_10m}
                />
                <Visibility value={weatherData.current.visibility} />
            </div>
        </motion.section>
    );
}
