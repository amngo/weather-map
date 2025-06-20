import { settingsAtom } from '@/atoms';
import { useAtomValue } from 'jotai';
import { Navigation2 } from 'lucide-react';

const DIRECTIONS = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
];

// const WIND_SPEED_SCALE = [
//     {
//         range: [0, 1],
//         label: 'Calm',
//         description: 'Smoke rises vertically. Leaves unmoving.',
//         beaufort: 0,
//         icon: '🌫️',
//         color: '#d4f1f9',
//     },
//     {
//         range: [1, 5],
//         label: 'Light Air',
//         description: 'Leaves rustle slightly. Wind vanes barely move.',
//         beaufort: 1,
//         icon: '🍃',
//         color: '#c1e6f7',
//     },
//     {
//         range: [6, 11],
//         label: 'Light Breeze',
//         description: 'Leaves in motion. Wind felt on face.',
//         beaufort: 2,
//         icon: '🌿',
//         color: '#a8ddf2',
//     },
//     {
//         range: [12, 19],
//         label: 'Gentle Breeze',
//         description: 'Leaves and small twigs in constant motion.',
//         beaufort: 3,
//         icon: '🍂',
//         color: '#90d2ed',
//     },
//     {
//         range: [20, 28],
//         label: 'Moderate Breeze',
//         description: 'Loose paper and small branches move.',
//         beaufort: 4,
//         icon: '🍃',
//         color: '#76c5e8',
//     },
//     {
//         range: [29, 38],
//         label: 'Fresh Breeze',
//         description: 'Small trees sway. Umbrellas hard to use.',
//         beaufort: 5,
//         icon: '🌬️',
//         color: '#59b9e3',
//     },
//     {
//         range: [39, 49],
//         label: 'Strong Breeze',
//         description: 'Large branches move. Whistling in wires.',
//         beaufort: 6,
//         icon: '🌬️',
//         color: '#3aaddd',
//     },
//     {
//         range: [50, 61],
//         label: 'Near Gale',
//         description: 'Whole trees sway. Walking becomes difficult.',
//         beaufort: 7,
//         icon: '💨',
//         color: '#189fd6',
//     },
//     {
//         range: [62, 74],
//         label: 'Gale',
//         description: 'Twigs break off trees. Slight structural damage.',
//         beaufort: 8,
//         icon: '💨',
//         color: '#008ed0',
//     },
//     {
//         range: [75, 88],
//         label: 'Severe Gale',
//         description: 'Shingles blown off roofs. Trees may uproot.',
//         beaufort: 9,
//         icon: '🌪️',
//         color: '#007bbd',
//     },
//     {
//         range: [89, 102],
//         label: 'Storm',
//         description: 'Widespread damage possible. Trees break.',
//         beaufort: 10,
//         icon: '🌪️',
//         color: '#0069aa',
//     },
//     {
//         range: [103, 117],
//         label: 'Violent Storm',
//         description: 'Extensive damage. Very dangerous.',
//         beaufort: 11,
//         icon: '🌪️',
//         color: '#005797',
//     },
//     {
//         range: [118, Infinity],
//         label: 'Hurricane Force',
//         description: 'Catastrophic damage. Avoid all outdoor activity.',
//         beaufort: 12,
//         icon: '🌀',
//         color: '#004484',
//     },
// ];

function getCompassDirection(degrees: number) {
    const index = Math.round((degrees % 360) / 22.5) % 16;
    return DIRECTIONS[index];
}

// function getWindLevel(speed: number) {
//     return WIND_SPEED_SCALE.find(
//         ({ range }) => speed >= range[0] && speed <= range[1]
//     );
// }

export default function Wind({
    value,
    direction,
}: {
    value: number;
    direction: number;
}) {
    const { windSpeed } = useAtomValue(settingsAtom);
    // const result = getWindLevel(Math.round(value));
    const directionLabel = getCompassDirection(direction);
    return (
        <section className="border rounded p-2 grid grid-cols-2 grid-rows-2 items-center">
            <h2 className="font-semibold text-sm">Wind</h2>
            <div className="flex items-center gap-2 justify-self-center row-span-2">
                <Navigation2
                    size={20}
                    style={{ transform: `rotate(${direction}deg)` }}
                />
                <span className="text-xs">{directionLabel}</span>
            </div>
            <span className="text-muted-foreground">
                {Math.round(value)} {windSpeed}
            </span>
        </section>
    );
}
