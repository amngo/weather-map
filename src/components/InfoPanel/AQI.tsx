import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const AIR_QUALITY_SCALE = [
    {
        range: [0, 50],
        label: 'Good',
        description: 'Air quality is considered satisfactory.',
        color: 'green',
        icon: '🟢',
        level: 'Low',
    },
    {
        range: [51, 100],
        label: 'Moderate',
        description: 'Air quality is acceptable.',
        color: 'yellow',
        icon: '🟡',
        level: 'Moderate',
    },
    {
        range: [101, 150],
        label: 'Unhealthy',
        description:
            'Members of sensitive groups may experience health effects.',
        color: 'orange',
        icon: '🟠',
        level: 'Elevated',
    },
    {
        range: [151, 200],
        label: 'Unhealthy',
        description: 'Everyone may begin to experience health effects.',
        color: 'red',
        icon: '🔴',
        level: 'High',
    },
    {
        range: [201, 300],
        label: 'Very Unhealthy',
        description:
            'Health alert: The risk of health effects is increased for everyone.',
        color: 'purple',
        icon: '🟣',
        level: 'Very High',
    },
    {
        range: [301, 500],
        label: 'Hazardous',
        description:
            'Health warnings of emergency conditions. Everyone is more likely to be affected.',
        color: 'rose',
        icon: '🟤',
        level: 'Severe',
    },
];

function getAirQualityInfo(aqi: number) {
    return AIR_QUALITY_SCALE.find(
        ({ range }) => aqi >= range[0] && aqi <= range[1]
    );
}

export default function AQI({ value }: { value: number }) {
    const result = getAirQualityInfo(value);

    return (
        <Tooltip>
            <TooltipTrigger>
                <section className="border rounded p-2">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-sm">AQI</h2>
                        <Badge variant="secondary">{result?.label}</Badge>
                    </div>

                    <div className="relative size-32 mx-auto mt-1">
                        <svg
                            className="rotate-[135deg] size-full"
                            viewBox="0 0 36 36"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Background Circle (Gauge) */}
                            <circle
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                className={`stroke-current text-${result?.color}-200`}
                                strokeWidth="1"
                                strokeDasharray="75 100"
                                strokeLinecap="round"
                            ></circle>

                            {/* Gauge Progress */}
                            <circle
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                className={`stroke-current text-${result?.color}-500`}
                                strokeWidth="2"
                                strokeDasharray={`${(value / 500) * 75} 100`}
                                strokeLinecap="round"
                            ></circle>
                        </svg>

                        {/* Value Text */}
                        <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <span
                                className={`font-semibold text-4xl text-${result?.color}-500`}
                            >
                                {value}
                            </span>
                            <span className={`text-${result?.color}-500 block`}>
                                {result?.level || 'N/A'}
                            </span>
                        </div>
                    </div>
                </section>
            </TooltipTrigger>
            <TooltipContent>
                <p>{result?.description}</p>
            </TooltipContent>
        </Tooltip>
    );
}
