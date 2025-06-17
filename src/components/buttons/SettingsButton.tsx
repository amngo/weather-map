import { Settings } from 'lucide-react';

export default function SettingsButton() {
    return (
        <div className="bg-background rounded h-8 flex items-center justify-center p-2 hover:bg-gray-100 transition-colors duration-300 ease-in-out cursor-pointer gap-1 border border-gray-200">
            <Settings size={14} />
            <span className="font-semibold text-sm">Settings</span>
        </div>
    );
}
