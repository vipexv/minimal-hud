import { BiSolidShieldAlt2 } from "react-icons/bi";
import { TiHeartFullOutline } from "react-icons/ti";
import { StatBar, StatBarSegmented } from "./ui/status-bars";
import { PlayerStateInterface, usePlayerStateStore } from "@/states/player";
import { useNuiEvent } from "@/hooks/useNuiEvent";

export const PlayerStatus = () => {
    const [playerState, setPlayerState] = usePlayerStateStore();

    useNuiEvent<PlayerStateInterface>("setPlayerState", setPlayerState);

    return (
        <div
            className={
                "absolute bottom-2 left-1 flex w-[15dvw] flex-col items-center justify-center gap-1 -skew-y-[1deg] "
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
    );
};
