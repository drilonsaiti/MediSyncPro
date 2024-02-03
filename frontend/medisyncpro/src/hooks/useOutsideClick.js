import {useEffect, useRef} from "react";

export function useOutsideClick(close, additionalPixelsY = 70, listenCapturing = true) {
    const ref = useRef();
    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                const rect = ref.current.getBoundingClientRect();
                const offsetY = additionalPixelsY;
                const isOutsideClick = (
                    e.clientY < rect.top - offsetY ||
                    e.clientY > rect.bottom + offsetY ||
                    e.clientX < rect.left ||
                    e.clientX > rect.right
                );
                if (isOutsideClick) {
                    close();
                }
            }
        }

        document.addEventListener("click", handleClick, listenCapturing);

        return () => document.removeEventListener("click", handleClick, listenCapturing);
    }, [close, additionalPixelsY, listenCapturing]);

    return ref;
}