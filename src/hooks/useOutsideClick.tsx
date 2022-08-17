import type { RefObject } from "preact";
import { useEffect } from "preact/hooks";

const useOutsideClick = (ref: RefObject<HTMLElement>, action: () => any) => {
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                action();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};

export default useOutsideClick;