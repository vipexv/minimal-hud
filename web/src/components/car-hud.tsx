import {
    useVehicleStateStore,
    type VehicleStateInterface,
} from "@/states/vehicle";
import Speedometer from "./ui/speedometer";
import { TextProgressBar } from "./ui/text-progress-bar";
import { useNuiEvent } from "@/hooks/useNuiEvent";

export const CarHud = () => {
    const [vehicleState, setVehicleState] = useVehicleStateStore();

    useNuiEvent<VehicleStateInterface>("setVehicleState", setVehicleState);

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
            <div className={"flex gap-2 items-center mr-2"}>
                <TextProgressBar label="FUEL" value={vehicleState.fuel} />
                <TextProgressBar label="ENG" value={vehicleState.engine} />
                <TextProgressBar label="BELT" value={100} />
            </div>
        </div>
    );
};
