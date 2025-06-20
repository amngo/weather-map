import { Badge } from '../ui/badge';

export const VISIBILITY_SCALE = [
    {
        range: [0, 100],
        label: 'Dense Fog',
        description: 'Very dangerous visibility. Travel is not advised.',
        icon: '🌫️',
        color: '#a8a8a8',
        visibilityLevel: 'Very Poor',
    },
    {
        range: [101, 500],
        label: 'Thick Fog',
        description: 'Limited visibility. Drive with extreme caution.',
        icon: '🌁',
        color: '#bcbcbc',
        visibilityLevel: 'Very Poor',
    },
    {
        range: [501, 1000],
        label: 'Moderate Fog',
        description: 'Visibility is poor. Use low-beam lights if driving.',
        icon: '🌫️',
        color: '#cfcfcf',
        visibilityLevel: 'Poor',
    },
    {
        range: [1001, 2000],
        label: 'Light Fog',
        description: 'Noticeable haze, but some visibility remains.',
        icon: '🌫️',
        color: '#e0e0e0',
        visibilityLevel: 'Fair',
    },
    {
        range: [2001, 4000],
        label: 'Haze',
        description:
            'Visibility is slightly reduced. Common in polluted or humid areas.',
        icon: '🌫️',
        color: '#e8e8e8',
        visibilityLevel: 'Moderate',
    },
    {
        range: [4001, 10000],
        label: 'Clear',
        description: 'Normal visibility for outdoor activities and driving.',
        icon: '🌤️',
        color: '#f2f2f2',
        visibilityLevel: 'Good',
    },
    {
        range: [10001, Infinity],
        label: 'Very Clear',
        description: 'Excellent visibility. Great for long-distance views.',
        icon: '☀️',
        color: '#ffffff',
        visibilityLevel: 'Excellent',
    },
];

function getVisibilityCategoryMeters(visibilityMeters: number) {
    return VISIBILITY_SCALE.find(
        ({ range }) =>
            visibilityMeters >= range[0] && visibilityMeters <= range[1]
    );
}

export default function Visibility({ value }: { value: number }) {
    const result = getVisibilityCategoryMeters(value);

    return (
        <section className="border rounded p-2">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm">Visibility</h2>
                <Badge variant="secondary">{result?.visibilityLevel}</Badge>
            </div>

            <div className="flex flex-col">
                <span className="text-muted-foreground">{value} meters</span>
            </div>
        </section>
    );
}
