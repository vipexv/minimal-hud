import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export interface VehicleStateInterface {
    speed: number;
    rpm: number;
    engineState: boolean;
    engineHealth: number;
    gears: number;
    fuel: number;
}

const mockVehicleState: VehicleStateInterface = {
    speed: 42,
    rpm: 20,
    engineState: true,
    engineHealth: 50,
    gears: 8,
    fuel: 50,
};

const vehicleState = atom<VehicleStateInterface>(mockVehicleState);

export const useVehicleState = () => useAtomValue(vehicleState);
export const useSetVehicleState = () => useSetAtom(vehicleState);
export const useVehicleStateStore = () => useAtom(vehicleState);
