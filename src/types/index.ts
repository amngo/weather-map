export type WeatherCode =
    | 0
    | 1
    | 2
    | 3
    | 45
    | 48
    | 51
    | 53
    | 55
    | 56
    | 57
    | 61
    | 63
    | 65
    | 66
    | 67
    | 71
    | 73
    | 75
    | 77
    | 80
    | 81
    | 82
    | 85
    | 86
    | 95
    | 96
    | 99;

export interface Location {
    id: string | number | undefined;
    name: string;
    latitude: number;
    longitude: number;
}

export interface WeatherData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: {
        time: string;
        interval: string;
        weather_code: string;
        temperature_2m: string;
        relative_humidity_2m: string;
        apparent_temperature: string;
        wind_speed_10m: string;
        wind_direction_10m: string;
        surface_pressure: string;
        precipitation: string;
        precipitation_probability: string;
        visibility: string;
    };
    current: {
        time: string;
        interval: number;
        weather_code: WeatherCode;
        temperature_2m: number;
        relative_humidity_2m: number;
        apparent_temperature: number;
        wind_speed_10m: number;
        wind_direction_10m: number;
        surface_pressure: number;
        precipitation: number;
        precipitation_probability: number;
        visibility: number;
        is_day: 0 | 1;
    };
    hourly_units: {
        time: string;
        temperature_2m: string;
    };
    hourly: {
        time: string[];
        temperature_2m: number[];
    };
    daily_units: {
        time: string;
        weather_code: string;
        temperature_2m_max: string;
        temperature_2m_min: string;
        temperature_2m_mean: string;
        uv_index_max: string;
    };
    daily: {
        time: string[];
        weather_code: WeatherCode[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        temperature_2m_mean: number[];
        uv_index_max: number[];
        precipitation_probability_mean: number[];
    };
    aq: {
        latitude: number;
        longitude: number;
        generationtime_ms: number;
        utc_offset_seconds: number;
        timezone: string;
        timezone_abbreviation: string;
        elevation: number;
        current_units: {
            time: string;
            interval: string;
            uv_index: string;
            uv_index_clear_sky: string;
            us_aqi: string;
        };
        current: {
            time: string;
            interval: number;
            uv_index: number;
            uv_index_clear_sky: number;
            us_aqi: number;
        };
    };
}

export interface Settings {
    temperature: 'celsius' | 'fahrenheit';
    windSpeed: 'kmh' | 'mph' | 'ms' | 'kn';
    precipitation: 'mm' | 'inch';
}
