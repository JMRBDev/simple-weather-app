import { useStore } from "@nanostores/preact";
import dayjs from "dayjs";
import { useEffect, useState } from "preact/hooks";
import type { APIError, Forecast } from "../../interfaces";
import { getForecast } from "../../services/forecast";
import { place } from "../../stores/searchStore";
import PlaceInput from "../PlaceInput";

const Today = () => {
    const [data, setData] = useState<Forecast>();
    const $place = useStore(place);

    useEffect(() => {
        const _getForecast = async () => {
            const _data = await getForecast($place);

            if ((_data as APIError).error) {
                return;
            }

            setData(_data as Forecast);
        }

        _getForecast();
    }, [$place]);

    if (!data) {
        return (
            <div role="status" class="w-full h-[100vh] flex justify-center items-center">
                <svg class="inline w-10 h-10 animate-spin fill-slate-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        );
    }

    return (
        <main class={`flex justify-center items-center w-full h-[100vh] overflow-hidden`}>
            <div class="w-96">
                <div class="flex items-center justify-center gap-4 text-slate-900 rounded-lg mb-4">
                    <img class="w-36" src={data.current.condition.icon} alt={data.current.condition.text} />

                    <div class="flex flex-col gap-2">
                        <p class="text-4xl font-bold">{data.current.temp_c} ºC</p>
                        <p>🌧 {data.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
                    </div>
                </div>

                <div class="flex flex-col items-center font-light">
                    <PlaceInput location={data.location} />
                    <p class="text-sm">
                        Local time: {dayjs(data.location.localtime).format('YYYY-MM-DD, hh:mm a')}
                    </p>
                </div>

                <div class="flex justify-evenly w-full gap-4 mt-8">
                    {data.forecast.forecastday.slice(1).map((item: any) => {
                        return (
                            <div class="flex flex-col items-center bg-slate-600 text-slate-50 p-4 rounded-md gap-2 shadow-md">
                                <p class="font-semibold">{dayjs(item.date).format('DD, dddd')}</p>
                                <img src={item.day.condition.icon} alt={item.day.condition.text} />
                                <p class="border p-1 rounded-md bg-slate-500">🌧 {item.day.daily_chance_of_rain}%</p>
                                <p>
                                    <span class="border p-1 rounded-md bg-slate-500">{item.day.maxtemp_c}º</span>
                                    /
                                    <span class="border p-1 rounded-md bg-slate-500">{item.day.mintemp_c}º</span>
                                </p>
                            </div>
                        );
                    })}
                </div>

                <p class="absolute bottom-0 left-0 w-full p-4 opacity-50 font-light flex justify-center text-xs">Last updated at: {data.current.last_updated}</p>
            </div>
        </main>
    );
}

export default Today;
