import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export interface MinimapStateInterface {
    width: number;
    height: number;
    left: number;
    top: number;
}

const mockMinimapState: MinimapStateInterface = {
    height: 197.64,
    left: 1.0000020265579224,
    top: 75.99999797344208,
    width: 314.496,
};

const minimapState = atom<MinimapStateInterface>(mockMinimapState);

export const useMinimapState = () => useAtomValue(minimapState);
export const useSetMinimapState = () => useSetAtom(minimapState);
export const useMinimapStateStore = () => useAtom(minimapState);
