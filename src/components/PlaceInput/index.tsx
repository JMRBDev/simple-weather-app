import { useStore } from '@nanostores/preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import useDebounce from '../../hooks/useDebounce';
import type { Location, Prediction } from '../../interfaces';
import { getPredictions } from '../../services/autocomplete';
import { place } from '../../stores/searchStore';
import OutsideClickAlerter from '../OutsideClickAlerter';

export interface PlaceInputProps {
    location: Location;
}

const PlaceInput = ({ location }: PlaceInputProps) => {
    const [isInput, setIsInput] = useState(false);
    const $place = useStore(place);
    const [value, setValue] = useState(`${location.name && `${location.name}, `}${location.region && `${location.region}, `}${location.country && location.country}`);
    const [predictionsResults, setPredictionsResults] = useState<Prediction[]>([]);

    const ref = useRef<HTMLInputElement>(null);

    const handleSearch = (prediction: Prediction) => {
        const query = `${prediction.name && `${prediction.name}, `}${prediction.region && `${prediction.region}, `}${prediction.country && prediction.country}`;
        place.set(query.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));

        setIsInput(false);
    }

    const handleOnChange = (e: any) => {
        setValue(e.target.value);

        if (e.target.value.length <= 2) {
            setPredictionsResults([]);
        }
    }

    const handleOnFocusLost = () => {
        setIsInput(false);
        setPredictionsResults([]);
        setValue(`${location.name && `${location.name}, `}${location.region && `${location.region}, `}${location.country && location.country}`);
    }

    useDebounce(async () => {
        if (value && value.length > 2) {
            const predictions = await getPredictions(value);

            setPredictionsResults(predictions as Prediction[]);
        }
    }, [value], 1000);

    useEffect(() => {
        if (isInput) {
            ref.current?.focus();
        }
    }, [isInput]);

    useEffect(() => {
        if ($place !== 'auto:ip') {
            setValue($place);
        }
    }, [$place]);

    return (
        <>
            {isInput ? (
                <OutsideClickAlerter
                    class="w-full relative"
                    action={handleOnFocusLost}
                    onClick={() => ref.current?.focus()}
                >
                    <>
                        <div class="relative flex px-4 py-3 w-full font-semibold text-lg text-slate-900 bg-slate-300 rounded-lg">
                            <div class="flex inset-y-0 items-center pointer-events-none">
                                <svg
                                    aria-hidden="true"
                                    class="w-5 h-5 text-slate-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input
                                type="search"
                                class="flex-1 mx-2 pl-2 pr-1 font-semibold text-lg text-slate-900 bg-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block overflow-hidden text-ellipsis whitespace-nowrap"
                                id="search"
                                name="search"
                                placeholder="Search"
                                value={value}
                                onInput={handleOnChange}
                                ref={ref}
                                autoComplete="off"
                                required
                            />
                        </div>
                        {predictionsResults.length > 0 && (
                            <div class="mt-1 bg-slate-300 text-slate-900 absolute w-full flex flex-col gap-1 rounded-lg py-2 max-h-screen">
                                {predictionsResults.map((prediction) => (
                                    <p
                                        key={prediction.id}
                                        onClick={() => handleSearch(prediction)}
                                        class="text-sm cursor-pointer px-4 py-1 hover:bg-slate-500 overflow-hidden text-ellipsis whitespace-nowrap"
                                    >
                                        {prediction.name && (
                                            <span class="font-semibold">{prediction.name}</span>
                                        )}
                                        ,&nbsp;
                                        {prediction.region && (
                                            <span>{prediction.region}</span>
                                        )}
                                        ,&nbsp;
                                        {prediction.country && (
                                            <span>{prediction.country}</span>
                                        )}
                                    </p>
                                ))}
                            </div>
                        )}
                    </>
                </OutsideClickAlerter>
            ) : (
                <p class="w-full font-semibold text-lg hover:bg-slate-300 py-3 px-4 text-slate-900 bg-slate-200 rounded-lg cursor-text overflow-hidden text-ellipsis whitespace-nowrap" onClick={() => setIsInput(true)}>
                    {`${location.name && `${location.name}, `}${location.region && `${location.region}, `}${location.country && location.country}`}
                </p>
            )}
        </>
    );
}

export default PlaceInput;
