import { OPTIONS } from "../contants";
import type { APIError, Prediction } from "../interfaces";

export const getPredictions = async (query: string): Promise<Prediction[] | APIError> => {
    const res = await (await fetch(`https://weatherapi-com.p.rapidapi.com/search.json?q=${query}`, OPTIONS)).json();

    return res as Prediction[] | APIError;
}