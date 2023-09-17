// hooks/useOutsideClick.ts
import { useEffect, MutableRefObject } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideClick(
    ref: MutableRefObject<null | HTMLElement>,
    callback: () => void
) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}

export default useOutsideClick;
