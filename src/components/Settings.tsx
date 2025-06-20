import SettingsButton from './buttons/SettingsButton';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { useAtom } from 'jotai';
import { settingsAtom } from '@/atoms';

export default function Settings() {
    const [{ temperature, windSpeed, precipitation }, setSettings] =
        useAtom(settingsAtom);

    const handleUnitChange = (type: string, value: string) => {
        setSettings((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <SettingsButton />
            </PopoverTrigger>
            <PopoverContent className="w-full">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">Settings</h4>
                        <p className="text-muted-foreground text-sm">
                            Change your unit preferences.
                        </p>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 items-center justify-items-end">
                        <Label
                            htmlFor="temperature-unit"
                            className="justify-self-start"
                        >
                            Temperature Unit
                        </Label>

                        <ToggleGroup
                            id="temperature-unit"
                            variant="outline"
                            type="single"
                            defaultValue={temperature}
                            onValueChange={(value) =>
                                handleUnitChange('temperature', value)
                            }
                        >
                            <ToggleGroupItem
                                value="fahrenheit"
                                className="w-[200px]"
                            >
                                Fahrenheit F°
                            </ToggleGroupItem>
                            <ToggleGroupItem value="celsius">
                                Celsius C°
                            </ToggleGroupItem>
                        </ToggleGroup>

                        <Label
                            htmlFor="wind-speed-unit"
                            className="justify-self-start"
                        >
                            Wind Speed Unit
                        </Label>
                        <ToggleGroup
                            id="wind-speed-unit"
                            variant="outline"
                            type="single"
                            defaultValue={windSpeed}
                            onValueChange={(value) =>
                                handleUnitChange('windSpeed', value)
                            }
                        >
                            <ToggleGroupItem value="kmh" className="w-[100px]">
                                km/h
                            </ToggleGroupItem>
                            <ToggleGroupItem value="ms">m/s</ToggleGroupItem>
                            <ToggleGroupItem value="mph">mph</ToggleGroupItem>
                            <ToggleGroupItem value="kn">Knots</ToggleGroupItem>
                        </ToggleGroup>

                        <Label
                            htmlFor="precipitation-unit"
                            className="justify-self-start"
                        >
                            Precipitation Unit
                        </Label>
                        <ToggleGroup
                            id="precipitation-unit"
                            variant="outline"
                            type="single"
                            defaultValue={precipitation}
                            onValueChange={(value) =>
                                handleUnitChange('precipitation', value)
                            }
                        >
                            <ToggleGroupItem value="mm" className="w-[150px]">
                                Milimeter
                            </ToggleGroupItem>
                            <ToggleGroupItem value="inch">Inch</ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
