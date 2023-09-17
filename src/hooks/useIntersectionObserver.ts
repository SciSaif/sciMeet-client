// useIntersectionObserver.ts
import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
    const targetRef = useRef<HTMLDivElement | null>(null); // Specify the type explicitly
    const [refChanged, setRefChanged] = useState(false);

    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        // console.log("target", targetRef.current);
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
                observer.disconnect();
            }
        };
    }, [options, targetRef, refChanged]);

    const setTargetRef = (ref: HTMLDivElement | null) => {
        targetRef.current = ref;
        setRefChanged(!refChanged);
    };

    return { targetRef, isIntersecting, setTargetRef };
};

export default useIntersectionObserver;
