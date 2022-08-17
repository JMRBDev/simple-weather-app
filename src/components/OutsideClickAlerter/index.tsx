import { useRef } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import useOutsideClick from "../../hooks/useOutsideClick";

export interface OutsideClickAlerterProps {
    children: JSX.Element;
    action: () => any;
    [key: string]: any;
};

const OutsideClickAlerter = ({ children, action, ...props }: OutsideClickAlerterProps) => {
    const ref = useRef(null);
    useOutsideClick(ref, action);

    return (
        <div ref={ref} {...props}>{children}</div>
    );
}

export default OutsideClickAlerter;