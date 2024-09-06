import { isEnvBrowser } from "./misc";

let nuiDebugMode = false;

export const setDebugMode = (state: boolean) => {
    nuiDebugMode = state;
    console.log("[DEBUG] Updating NUI Debug Mode state to:", state);
};

export const getDebugMode = () => {
    return nuiDebugMode;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const debug = (...args: any) => {
    if (!isEnvBrowser() && !nuiDebugMode) return;

    console.log("[DEBUG]", ...args);
};
