import { weatherDataAtom } from '@/atoms';
import { useAtomValue } from 'jotai';
import { ArrowDown, ArrowUp, Droplet } from 'lucide-react';

export default function MiniForecast() {
    const weatherData = useAtomValue(weatherDataAtom);

    return (
        <section className="col-span-2 border rounded p-2 flex flex-col gap-1">
            <ol className="grid grid-cols-5 gap-3">
                {weatherData?.daily.time.slice(0, 5).map((time, index) => {
                    const date = new Date(
                        time + weatherData.timezone_abbreviation
                    ).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        weekday: 'short',
                        timeZone: weatherData.timezone,
                    });

                    const weatherCode = weatherData.daily.weather_code[index];
                    const minTemp = Math.round(
                        weatherData.daily.temperature_2m_min[index]
                    );
                    const maxTemp = Math.round(
                        weatherData.daily.temperature_2m_max[index]
                    );

                    return (
                        <li
                            key={time}
                            className="flex flex-col items-center justify-center"
                        >
                            <span className="text-xs font-semibold col-span-2">
                                {date.split(',')[0]}
                            </span>
                            <span className="col-span-2 ">
                                {date.split(',')[1]}
                            </span>

                            <img
                                src={`/weather/${weatherCode}.svg`}
                                alt=""
                                className="size-8 col-span-2"
                            />
                            <span className="text-xs flex gap-0.5 items-center">
                                <ArrowUp size={8} />
                                {maxTemp}°
                            </span>
                            <span className="text-xs flex gap-0.5 items-center">
                                <ArrowDown size={8} />
                                {minTemp}°
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1 justify-self-start">
                                <Droplet
                                    size={10}
                                    color="var(--color-sky-500)"
                                />
                                {Math.round(
                                    weatherData.daily
                                        .precipitation_probability_mean[index]
                                )}
                                %
                            </span>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}
