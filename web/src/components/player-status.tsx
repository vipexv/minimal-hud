import { BiSolidShieldAlt2 } from "react-icons/bi";
import { TiHeartFullOutline } from "react-icons/ti";
import { StatBar, StatBarSegmented } from "./ui/status-bars";
import { PlayerStateInterface, usePlayerStateStore } from "@/states/player";
import { useNuiEvent } from "@/hooks/useNuiEvent";
import { useMinimapState } from "@/states/minimap";

export const PlayerStatus = () => {
    const [playerState, setPlayerState] = usePlayerStateStore();
    const minimap = useMinimapState();

    useNuiEvent<PlayerStateInterface>("setPlayerState", setPlayerState);

    return (
        <div
            className={"absolute flex items-end justify-center"}
            style={{
                top: minimap.top + "%",
                left: minimap.left + "%",
                width: minimap.width + "px",
                height: minimap.height + "px",
            }}
        >
            <div
                className={
                    "w-full flex gap-1 items-center justify-center flex-col -mb-11 mr-2 -skew-y-[1deg]"
                }
            >
                <StatBarSegmented
                    Icon={<BiSolidShieldAlt2 size={17} />}
                    value={playerState.armor}
                    color="#10aef5"
                />
                <StatBar
                    Icon={<TiHeartFullOutline size={17} />}
                    value={playerState.health}
                    maxValue={100}
                />
            </div>
        </div>
    );
};
