import { useEffect, useState } from 'react';
import { useDebounce } from '@/lib/hooks';
import { useAtom } from 'jotai';
import { locationAtom } from '@/atoms';
import { getGeocoding } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { GeoJSONFeature } from 'mapbox-gl';
import { useMap } from 'react-map-gl/mapbox';
import {
    CommandDialog,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from './ui/command';
import { Button } from './ui/button';

export default function LocationSearch() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [results, setResults] = useState<GeoJSONFeature[]>([]);
    const debouncedValue = useDebounce(value, 500);
    const [location, setLocation] = useAtom(locationAtom);
    const { current: map } = useMap();

    const { data } = useQuery({
        queryKey: ['suggestions', debouncedValue],
        queryFn: async (): Promise<GeoJSONFeature[]> => {
            const response = await getGeocoding(debouncedValue);
            return response.features;
        },
        enabled: !!debouncedValue,
    });

    const handleSelect = (feature: GeoJSONFeature) => {
        // Append to local storage
        const storedLocations = JSON.parse(
            localStorage.getItem('recentLocations') || '[]'
        );
        // Check if the location already exists
        const existingIndex = storedLocations.findIndex(
            (loc: GeoJSONFeature) => loc.id === feature.id
        );
        if (existingIndex !== -1) {
            // Remove the existing location
            storedLocations.splice(existingIndex, 1);
        }
        const updatedLocations = [feature, ...storedLocations].slice(0, 5);
        localStorage.setItem(
            'recentLocations',
            JSON.stringify(updatedLocations)
        );

        setLocation({
            id: feature.id,
            name: feature.properties?.full_address,
            latitude: feature.properties?.coordinates.latitude,
            longitude: feature.properties?.coordinates.longitude,
        });
        setValue('');
        setOpen(false);
    };

    useEffect(() => {
        if (location) {
            map?.flyTo({
                center: [location.longitude, location.latitude],
                zoom: 16,
                speed: 4,
                curve: 1,
            });
        }
    }, [location, map]);

    useEffect(() => {
        if (!open) {
            setValue('');
            setResults([]);
        }
    }, [open]);

    useEffect(() => {
        if (data) {
            setResults(data);
        } else {
            setResults([]);
        }
    }, [data]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <div>
            <Button
                onClick={() => setOpen((open) => !open)}
                variant="outline"
                className="text-muted-foreground text-sm flex items-center gap-2 w-full"
            >
                <span>Search Location</span>
                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                    <span className="text-xs">⌘</span>J
                </kbd>
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    value={value}
                    onValueChange={(e) => setValue(e)}
                    placeholder="Type a location..."
                />
                <CommandList>
                    {!debouncedValue && (
                        <CommandGroup heading="Recent Locations">
                            {JSON.parse(
                                localStorage.getItem('recentLocations') || '[]'
                            ).map((location: GeoJSONFeature) => (
                                <CommandItem
                                    key={location.id}
                                    onSelect={() => handleSelect(location)}
                                >
                                    {location.properties?.full_address}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                    {results.length > 0 && (
                        <CommandGroup heading="Suggestions">
                            {results.map((feature) => (
                                <CommandItem
                                    key={feature.id}
                                    onSelect={() => handleSelect(feature)}
                                >
                                    {feature.properties?.full_address}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>
        </div>
        // <div className="relative w-[500px]">
        //     <Search
        //         size={14}
        //         className="absolute left-0 top-1/2 -translate-y-1/2 ml-2"
        //     />
        //     <Input
        //         value={value}
        //         onChange={(e) => setValue(e.target.value)}
        //         type="text"
        //         placeholder="Type a location"
        //         className="text-sm py-2 pl-8 pr-4 bg-gray-100 w-full h-8"
        //     />

        //     {value && !isLoading && data && (
        //         <ul className="absolute top-full left-0 w-full flex flex-col gap-2 bg-background/75 backdrop-blur rounded-b px-2 py-4 text-sm">
        //             {data?.map((feature) => (
        //                 <li
        //                     key={feature.id}
        //                     className="px-4 py-2 hover:bg-primary-foreground cursor-pointer rounded"
        //                     onClick={() => {
        //                         setLocation({
        //                             id: feature.id,
        //                             name: feature.properties?.full_address,
        //                             latitude:
        //                                 feature.properties?.coordinates
        //                                     .latitude,
        //                             longitude:
        //                                 feature.properties?.coordinates
        //                                     .longitude,
        //                         });

        //                         setValue('');
        //                     }}
        //                 >
        //                     {feature.properties?.full_address}
        //                 </li>
        //             ))}
        //         </ul>
        //     )}
        // </div>
    );
}
