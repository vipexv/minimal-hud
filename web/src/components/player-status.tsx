import { useNuiEvent } from "@/hooks/useNuiEvent";
import { useMinimapState } from "@/states/minimap";
import { PlayerStateInterface, usePlayerStateStore } from "@/states/player";
import React, { useCallback } from "preact/compat";
import { BiSolidShieldAlt2 } from "react-icons/bi";
import { FaBottleWater, FaBrain } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { TiHeartFullOutline } from "react-icons/ti";
import { StatBar, StatBarSegmented } from "./ui/status-bars";

const PlayerStatus = () => {
    const [playerState, setPlayerState] = usePlayerStateStore();
    const minimap = useMinimapState();

    const handlePlayerStateUpdate = useCallback(
        (newState: PlayerStateInterface) => {
            setPlayerState((prevState) => {
                if (JSON.stringify(prevState) !== JSON.stringify(newState)) {
                    return newState;
                }
                return prevState;
            });
        },
        [setPlayerState]
    );

    useNuiEvent<PlayerStateInterface>(
        "setPlayerState",
        handlePlayerStateUpdate
    );

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
                    "w-full flex relative gap-1 items-center justify-center -mb-11 mr-2 -skew-y-[2deg]"
                }
            >
                <div
                    className={
                        "flex flex-col w-full items-center justify-center gap-1"
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
                {typeof playerState.hunger === "number" &&
                    typeof playerState.thirst === "number" && (
                        <>
                            <div
                                className={
                                    "flex gap-3 items-center justify-start absolute -right-28 w-[30%] h-[4dvh]"
                                }
                            >
                                <StatBar
                                    Icon={<IoFastFood />}
                                    value={playerState.hunger}
                                    vertical
                                />
                                <StatBar
                                    Icon={<FaBottleWater />}
                                    value={playerState.thirst}
                                    color="#10aef5"
                                    vertical
                                />
                                {typeof playerState.stress === "number" && (
                                    <StatBar
                                        Icon={<FaBrain />}
                                        value={playerState.stress}
                                        color="#ff5b57"
                                        vertical
                                    />
                                )}
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
};

export default React.memo(PlayerStatus);
