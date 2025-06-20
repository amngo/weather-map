import { Badge } from '../ui/badge';

export default function Visibility() {
    return (
        <section className="border rounded p-2">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm">Visibility</h2>
                <Badge variant="secondary">Excellent</Badge>
            </div>

            <div className="flex flex-col">
                <span className="text-muted-foreground">7 mi</span>
            </div>
        </section>
    );
}
