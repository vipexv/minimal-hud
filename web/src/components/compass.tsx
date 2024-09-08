import { FaCompass, FaLocationDot, FaMap } from "react-icons/fa6";
import IconLabelBox from "./ui/icon-label-box";
import { usePlayerState } from "@/states/player";
import { debug } from "@/utils/debug";
import React from "preact/compat";

const Compass = () => {
    const playerState = usePlayerState();

    debug("(Compass) Rendering...");
    return (
        <div className={"flex w-full h-[10dvh] items-center justify-center"}>
            <div className={"flex gap-3 items-center justify-center w-[50%]"}>
                <IconLabelBox label={playerState.heading} Icon={FaCompass} />
                <IconLabelBox
                    label={playerState.streetLabel}
                    className="w-[20%]"
                    Icon={FaLocationDot}
                />
                <IconLabelBox label={playerState.areaLabel} Icon={FaMap} />
            </div>
        </div>
    );
};

export default React.memo(Compass);
