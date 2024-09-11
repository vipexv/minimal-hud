import { useNuiEvent } from "@/hooks/useNuiEvent";
import { usePlayerState } from "@/states/player";
import {
    useVehicleStateStore,
    type VehicleStateInterface,
} from "@/states/vehicle";
import { debug } from "@/utils/debug";
import React, { useCallback, useMemo } from "react";
import Speedometer from "./ui/speedometer";
import { TextProgressBar } from "./ui/text-progress-bar";

const CarHud = React.memo(function CarHud() {
    const [vehicleState, setVehicleState] = useVehicleStateStore();
    const playerState = usePlayerState();

    const handleVehicleStateUpdate = useCallback(
        (newState: VehicleStateInterface) => {
            setVehicleState((prevState) => {
                if (JSON.stringify(prevState) !== JSON.stringify(newState)) {
                    return newState;
                }
                return prevState;
            });
        },
        [setVehicleState]
    );

    useNuiEvent<VehicleStateInterface>(
        "setVehicleState",
        handleVehicleStateUpdate
    );

    const content = useMemo(() => {
        if (!playerState.isInVehicle) {
            debug(
                "(CarHud) Returning with no children since the player is not in a vehicle."
            );
            return null;
        }

        return (
            <div
                className={
                    "absolute bottom-1 right-1 w-[20dvw] h-[30dvh] flex-col items-center flex justify-center gap-2"
                }
            >
                <Speedometer
                    rpm={vehicleState.rpm}
                    speed={vehicleState.speed}
                    gears={vehicleState.gears}
                    maxRpm={100}
                />
                <div className={"flex gap-2 items-center mr-2 4k:-mt-14"}>
                    <TextProgressBar label="FUEL" value={vehicleState.fuel} />
                    <TextProgressBar label="ENG" value={vehicleState.engine} />
                    <TextProgressBar
                        label="BELT"
                        value={playerState.isSeatbeltOn ? 100 : 0}
                    />
                </div>
            </div>
        );
    }, [playerState.isInVehicle, vehicleState]);

    return content;
});

export default CarHud;
