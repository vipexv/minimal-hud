import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export interface MinimapStateInterface {
    width: number;
    height: number;
    left: number;
    top: number;
}

const mockMinimapState: MinimapStateInterface = {
    width: 100,
    height: 100,
    left: 0,
    top: 0,
};

const minimapState = atom<MinimapStateInterface>(mockMinimapState);

export const useMinimapState = () => useAtomValue(minimapState);
export const useSetMinimapState = () => useSetAtom(minimapState);
export const useMinimapStateStore = () => useAtom(minimapState);
