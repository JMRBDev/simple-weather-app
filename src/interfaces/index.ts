export interface Current {
    cloud: number;
    condition: Condition;
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    humidity: number;
    is_day: number;
    last_updated: string;
    last_updated_epoch: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    temp_c: number;
    temp_f: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
}

export interface Location {
    country: string;
    lat: number;
    localtime: string;
    localtime_epoch: number;
    lon: number;
    name: string;
    region: string;
    tz_id: string;
}

export interface Forecast {
    current: Current;
    forecast: Forecast;
    location: Location;
}

export interface Condition {
    code: number;
    icon: Icon;
    text: Text;
}

export enum Icon {
    CDNWeatherapiCOMWeather64X64Day113PNG = "//cdn.weatherapi.com/weather/64x64/day/113.png",
    CDNWeatherapiCOMWeather64X64Day116PNG = "//cdn.weatherapi.com/weather/64x64/day/116.png",
    CDNWeatherapiCOMWeather64X64Day119PNG = "//cdn.weatherapi.com/weather/64x64/day/119.png",
    CDNWeatherapiCOMWeather64X64Day122PNG = "//cdn.weatherapi.com/weather/64x64/day/122.png",
    CDNWeatherapiCOMWeather64X64Night113PNG = "//cdn.weatherapi.com/weather/64x64/night/113.png",
    CDNWeatherapiCOMWeather64X64Night116PNG = "//cdn.weatherapi.com/weather/64x64/night/116.png",
    CDNWeatherapiCOMWeather64X64Night119PNG = "//cdn.weatherapi.com/weather/64x64/night/119.png",
}

export enum Text {
    Clear = "Clear",
    Cloudy = "Cloudy",
    Overcast = "Overcast",
    PartlyCloudy = "Partly cloudy",
    Sunny = "Sunny",
}

export interface Forecast {
    forecastday: Forecastday[];
}

export interface Forecastday {
    astro: Astro;
    date: Date;
    date_epoch: number;
    day: Day;
    hour: Hour[];
}

export interface Astro {
    moon_illumination: string;
    moon_phase: string;
    moonrise: string;
    moonset: string;
    sunrise: string;
    sunset: string;
}

export interface Day {
    avghumidity: number;
    avgtemp_c: number;
    avgtemp_f: number;
    avgvis_km: number;
    avgvis_miles: number;
    condition: Condition;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    daily_will_it_rain: number;
    daily_will_it_snow: number;
    maxtemp_c: number;
    maxtemp_f: number;
    maxwind_kph: number;
    maxwind_mph: number;
    mintemp_c: number;
    mintemp_f: number;
    totalprecip_in: number;
    totalprecip_mm: number;
    uv: number;
}

export interface Hour {
    chance_of_rain: number;
    chance_of_snow: number;
    cloud: number;
    condition: Condition;
    dewpoint_c: number;
    dewpoint_f: number;
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    heatindex_c: number;
    heatindex_f: number;
    humidity: number;
    is_day: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    temp_c: number;
    temp_f: number;
    time: string;
    time_epoch: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    will_it_rain: number;
    will_it_snow: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
    windchill_c: number;
    windchill_f: number;
}

export interface Prediction {
    country: string;
    id: number;
    lat: number;
    lon: number;
    name: string;
    region: string;
    url: string;
}

export interface APIError {
    error: Error;
}

export interface Error {
    code: number;
    message: string;
}
