import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export interface PlayerStateInterface {
    health: number;
    armor: number;
    streetLabel: string;
    areaLabel: string;
    heading: string;
    isInVehicle: boolean;
}

const mockPlayerState: PlayerStateInterface = {
    health: 100,
    armor: 100,
    streetLabel: "Downtown Vinewood",
    areaLabel: "Vinewood Blvd",
    heading: "NW",
    isInVehicle: false,
};

const playerState = atom<PlayerStateInterface>(mockPlayerState);

export const usePlayerState = () => useAtomValue(playerState);
export const setPlayerState = () => useSetAtom(playerState);
export const usePlayerStateStore = () => useAtom(playerState);
