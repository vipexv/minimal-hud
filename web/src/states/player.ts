import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export interface PlayerStateInterface {
    health: number;
    armor: number;
    hunger: number | string;
    thirst: number | string;
    streetLabel: string;
    areaLabel: string;
    heading: string;
    isSeatbeltOn: boolean;
    isInVehicle: boolean;
}

const mockPlayerState: PlayerStateInterface = {
    health: 100,
    armor: 100,
    hunger: 50,
    thirst: 100,
    streetLabel: "Downtown Vinewood",
    areaLabel: "Vinewood Blvd",
    heading: "NW",
    isSeatbeltOn: true,
    isInVehicle: true,
};

const playerState = atom<PlayerStateInterface>(mockPlayerState);

export const usePlayerState = () => useAtomValue(playerState);
export const useSetPlayerState = () => useSetAtom(playerState);
export const usePlayerStateStore = () => useAtom(playerState);
