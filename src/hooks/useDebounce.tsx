import { Inputs, useCallback, useEffect } from "preact/hooks";

const useDebounce = (effect: () => any, deps: Inputs, delay: number) => {
    const callback = useCallback(effect, deps);

    useEffect(() => {
        const handler = setTimeout(callback, delay);

        return () => clearTimeout(handler);
    }, [callback, delay]);
}

export default useDebounce;