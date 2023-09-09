// useIntersectionObserver.ts
import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (
    targetRef: React.RefObject<HTMLElement | null>,
    options: IntersectionObserverInit = {}
) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsIntersecting(entry.isIntersecting);
            },
            { ...options }
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [options, targetRef]);

    return { isIntersecting };
};

export default useIntersectionObserver;
