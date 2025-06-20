import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const HUMIDITY_SCALE = [
    {
        range: [0, 20],
        label: 'Extremely Dry',
        effects:
            'Skin and eyes may feel dry. Fire risk increases. Not ideal for outdoor activities.',
        comfort: 'Uncomfortable',
        icon: '🌵',
        color: '#f4dcdc',
    },
    {
        range: [21, 35],
        label: 'Very Dry',
        effects: 'Air feels dry. May cause dehydration during long exposure.',
        comfort: 'Slightly Uncomfortable',
        icon: '🏜️',
        color: '#edd3c4',
    },
    {
        range: [36, 50],
        label: 'Comfortable',
        effects: 'Ideal for outdoor activities. Sweat evaporates efficiently.',
        comfort: 'Comfortable',
        icon: '🌤️',
        color: '#d6f0e1',
    },
    {
        range: [51, 60],
        label: 'Slightly Humid',
        effects:
            'Still comfortable for most people, but might feel a bit sticky during heat.',
        comfort: 'Mildly Comfortable',
        icon: '🌥️',
        color: '#cce7ec',
    },
    {
        range: [61, 70],
        label: 'Moderately Humid',
        effects:
            'Can feel muggy or sweaty, especially during activity. Shade recommended.',
        comfort: 'Slightly Uncomfortable',
        icon: '🌦️',
        color: '#b1d1e0',
    },
    {
        range: [71, 80],
        label: 'Humid',
        effects:
            'Sweating is less effective. Fatigue may increase. Take breaks if active.',
        comfort: 'Uncomfortable',
        icon: '🌧️',
        color: '#98c3d6',
    },
    {
        range: [81, 90],
        label: 'Very Humid',
        effects:
            'Heavy, sticky air. Heat stress is likely. Limit strenuous activities.',
        comfort: 'Very Uncomfortable',
        icon: '🌫️',
        color: '#7caec6',
    },
    {
        range: [91, 100],
        label: 'Extremely Humid',
        effects:
            'Oppressive and potentially dangerous. High risk of heat exhaustion or heat stroke.',
        comfort: 'Dangerous',
        icon: '🥵',
        color: '#6397b3',
    },
];

function getHumidityLabel(value: number) {
    return HUMIDITY_SCALE.find(
        ({ range }) => value >= range[0] && value <= range[1]
    );
}

export default function Humidity({ value }: { value: number }) {
    const result = getHumidityLabel(Math.round(value));

    return (
        <Tooltip>
            <TooltipTrigger className="col-span-2">
                <section className="border rounded p-2 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-sm">Humidity</h2>
                        <Badge variant="secondary">{result?.label}</Badge>
                    </div>

                    <div className="flex items-center gap-2">
                        <Progress
                            value={Math.round(value)}
                            className="bg-sky-400"
                        />
                        <span className="text-xs font-semibold">
                            {Math.round(value)}%
                        </span>
                    </div>
                </section>
            </TooltipTrigger>
            <TooltipContent>
                <p className="max-w-[200px]">{result?.effects}</p>
            </TooltipContent>
        </Tooltip>
    );
}
