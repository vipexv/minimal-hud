import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export interface VehicleStateInterface {
    speed: number;
    rpm: number;
    engine: number;
    gears: number;
    fuel: number;
}

const mockVehicleState: VehicleStateInterface = {
    speed: 42,
    rpm: 20,
    engine: 50,
    gears: 8,
    fuel: 50,
};

const vehicleState = atom<VehicleStateInterface>(mockVehicleState);

export const useVehicleState = () => useAtomValue(vehicleState);
export const setVehicleState = () => useSetAtom(vehicleState);
export const useVehicleStateStore = () => useAtom(vehicleState);
