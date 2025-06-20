import { TriangleAlert } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

export default function ActiveAlert() {
    return (
        <div className="absolute top-16 left-1/2 -translate-x-1/2">
            <Alert variant="destructive" className="w-xl">
                <TriangleAlert />
                <AlertTitle>Excessive Heat Warning</AlertTitle>
                <AlertDescription>
                    <p>
                        An excessive heat warning is in effect for the area.
                        High temperatures are expected to reach 105°F (40°C) or
                        higher, with heat indices exceeding 110°F (43°C). Please
                        take precautions to stay safe and hydrated.
                    </p>
                </AlertDescription>
            </Alert>
        </div>
    );
}
