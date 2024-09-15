import { usePlayerState } from "@/states/player";
import React from "preact/compat";
import { FaCompass, FaLocationDot, FaMap } from "react-icons/fa6";
import IconLabelBox from "./ui/icon-label-box";

const Compass = () => {
  const playerState = usePlayerState();

  return (
    <div className={"flex w-full h-[10dvh] items-center justify-center"}>
      <div className={"flex gap-3 items-center justify-center w-[50%]"}>
        <IconLabelBox label={playerState.heading} Icon={FaCompass} />
        <IconLabelBox
          label={playerState.streetLabel}
          className="min-w-[20%]"
          Icon={FaLocationDot}
        />
        <IconLabelBox
          className="px-3"
          label={playerState.areaLabel}
          Icon={FaMap}
        />
      </div>
    </div>
  );
};

export default React.memo(Compass);
