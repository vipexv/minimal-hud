import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export interface PlayerStateInterface {
  health: number;
  armor: number;
  hunger: number;
  thirst: number;
  stress: number | string;
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
  stress: 0,
  streetLabel: "Downtown Vinewood",
  areaLabel: "Vinewood Blvd",
  heading: "NW",
  isSeatbeltOn: false,
  isInVehicle: true,
};

const playerState = atom<PlayerStateInterface>(mockPlayerState);

export const usePlayerState = () => useAtomValue(playerState);
export const useSetPlayerState = () => useSetAtom(playerState);
export const usePlayerStateStore = () => useAtom(playerState);
