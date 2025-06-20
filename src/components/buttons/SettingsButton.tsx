import { Settings } from 'lucide-react';
import { Button } from '../ui/button';

export default function SettingsButton({ ...props }) {
    return (
        <Button
            variant="outline"
            {...props}
            className="rounded h-8 flex items-center justify-center p-2 transition-colors duration-300 ease-in-out gap-2 border justify-self-end"
        >
            <Settings size={14} />
            <span className="font-semibold text-sm">Settings</span>
        </Button>
    );
}
