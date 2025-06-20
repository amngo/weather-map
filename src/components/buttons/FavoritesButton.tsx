import { Star } from 'lucide-react';
import { Button } from '../ui/button';

export default function FavoritesButton({ ...props }) {
    return (
        <Button
            variant="outline"
            {...props}
            className="rounded h-8 flex items-center justify-center p-2 transition-colors duration-300 ease-in-out gap-2 border justify-self-end"
        >
            <Star size={14} />
            <span className="font-semibold text-sm">Favorites</span>
        </Button>
    );
}
