/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { fetchNui } from "@/utils/fetchNui";
import { noop } from "@/utils/misc";

type FrameVisibleSetter = (bool: boolean) => void;

const LISTENED_KEYS: string[] = ["Escape"];

// Basic hook to listen for key presses in NUI in order to exit
export const useExitListener: (
    visibleSetter: FrameVisibleSetter,
    cb?: () => void
) => void = (visibleSetter: FrameVisibleSetter, cb?: () => void): void => {
    const setterRef: React.MutableRefObject<FrameVisibleSetter> =
        useRef<FrameVisibleSetter>(noop);

    useEffect((): void => {
        setterRef.current = visibleSetter;
    }, [visibleSetter]);

    useEffect((): (() => void) => {
        const keyHandler: (e: KeyboardEvent) => void = (
            e: KeyboardEvent
        ): void => {
            if (LISTENED_KEYS.includes(e.code)) {
                setterRef.current(false);
                cb && cb();
                fetchNui("hideFrame");
            }
        };

        window.addEventListener("keyup", keyHandler);

        return (): void => window.removeEventListener("keyup", keyHandler);
    }, []);
};
