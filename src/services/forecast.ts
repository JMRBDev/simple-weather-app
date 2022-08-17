import { OPTIONS } from "../contants";
import type { APIError, Forecast } from "../interfaces";

export const getForecast = async (query = 'auto:ip', days = '3', lang = 'es'): Promise<Forecast | APIError> => {
    const res = await (await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${query}&days=${days}&lang=${lang}`, OPTIONS)).json();

    return res as Forecast | APIError;
}