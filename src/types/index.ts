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
    alert: WeatherAlertFeature | null;
}

export interface Settings {
    temperature: 'celsius' | 'fahrenheit';
    windSpeed: 'kmh' | 'mph' | 'ms' | 'kn';
    precipitation: 'mm' | 'inch';
}

export type Severity = 'Extreme' | 'Severe' | 'Moderate' | 'Minor' | 'Unknown';
export type Urgency = 'Immediate' | 'Expected' | 'Future' | 'Past' | 'Unknown';
export type Certainty =
    | 'Observed'
    | 'Likely'
    | 'Possible'
    | 'Unlikely'
    | 'Unknown';

export interface WeatherAlertFeatureCollection {
    '@context': (
        | string
        | {
              '@version': string;
              wx: string;
              '@vocab': string;
          }
    )[];
    type: 'FeatureCollection';
    features: WeatherAlertFeature[];
    title: string;
    updated: string;
}

interface WeatherAlertFeature {
    id: string;
    type: 'Feature';
    geometry: null;
    properties: WeatherAlertProperties;
}

interface WeatherAlertProperties {
    '@id': string;
    '@type': string;
    id: string;
    areaDesc: string;
    geocode: {
        SAME: string[];
        UGC: string[];
    };
    affectedZones: string[];
    references: WeatherAlertReference[];
    sent: string;
    effective: string;
    onset: string;
    expires: string;
    ends: string;
    status: string;
    messageType: string;
    category: string;
    severity: Severity;
    certainty: Certainty;
    urgency: Urgency;
    event: string;
    sender: string;
    senderName: string;
    headline: string;
    description: string;
    instruction: string;
    response: string;
    parameters: WeatherAlertParameters;
    scope: string;
    code: string;
    language: string;
    web: string;
    eventCode: {
        SAME: string[];
        NationalWeatherService: string[];
    };
}

interface WeatherAlertReference {
    '@id': string;
    identifier: string;
    sender: string;
    sent: string;
}

interface WeatherAlertParameters {
    AWIPSidentifier: string[];
    WMOidentifier: string[];
    NWSheadline: string[];
    BLOCKCHANNEL: string[];
    VTEC: string[];
    eventEndingTime: string[];
}
