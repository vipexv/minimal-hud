import { TiHeartFullOutline } from "react-icons/ti";
import { StatBar, StatBarSegmented } from "./ui/status-bars";
import { BiSolidShieldAlt2 } from "react-icons/bi";

export const PlayerStatus = () => {
    return (
        <div
            className={
                "absolute bottom-1 left-1 flex w-[20dvw] flex-col items-center justify-center gap-1 skew-x-[3deg] "
            }
        >
            <StatBarSegmented
                icon={<BiSolidShieldAlt2 size={17} />}
                value={50}
                color="#10aef5"
            />
            <StatBar
                icon={<TiHeartFullOutline size={17} />}
                value={20}
                maxValue={100}
            />
        </div>
    );
};
