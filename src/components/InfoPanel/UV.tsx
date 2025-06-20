import { clamp } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const UV_INDEX_SCALE = [
    {
        range: [0, 2.99],
        level: 'Low',
        risk: 'Minimal risk. No protection needed.',
        icon: '🟢',
        color: 'green',
    },
    {
        range: [3, 5.99],
        level: 'Moderate',
        risk: 'Moderate risk. Stay in shade during midday hours.',
        icon: '🟡',
        color: 'yellow',
    },
    {
        range: [6, 7.99],
        level: 'High',
        risk: 'High risk. Protection needed — SPF 30+, hat, sunglasses, and seek shade.',
        icon: '🟠',
        color: 'orange',
    },
    {
        range: [8, 10.99],
        level: 'Very High',
        risk: 'Very high risk. Extra protection required.',
        icon: '🔴',
        color: 'red',
    },
    {
        range: [11, Infinity],
        level: 'Extreme',
        risk: 'Extreme risk. Take all precautions — unprotected skin and eyes can burn in minutes.',
        icon: '🟣',
        color: 'purple',
    },
];

function getUVInfo(index: number) {
    return UV_INDEX_SCALE.find(
        ({ range }) => index >= range[0] && index <= range[1]
    );
}

export default function UV({ value }: { value: number }) {
    const result = getUVInfo(value);

    return (
        <Tooltip>
            <TooltipTrigger>
                <section className="border rounded p-2">
                    <h2 className="font-semibold text-sm text-left">UV</h2>
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
                                strokeDasharray={`${
                                    clamp(value, 0, 10) * 7.5
                                } 100`}
                                strokeLinecap="round"
                            ></circle>
                        </svg>

                        {/* Value Text */}
                        <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <span
                                className={`font-semibold text-4xl text-${result?.color}-500`}
                            >
                                {Math.round(value)}
                            </span>
                            <span className={`text-${result?.color}-500 block`}>
                                {result?.level || 'N/A'}
                            </span>
                        </div>
                    </div>
                </section>
            </TooltipTrigger>
            <TooltipContent>
                <p>{result?.risk}</p>
            </TooltipContent>
        </Tooltip>
    );
}
