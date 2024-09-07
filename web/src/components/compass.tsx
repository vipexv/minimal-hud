import { FaCompass, FaLocationDot, FaMap } from "react-icons/fa6";
import IconLabelBox from "./ui/icon-label-box";

export const Compass = () => {
    return (
        <div className={"flex w-full h-[10dvh] items-center justify-center"}>
            <div className={"flex gap-3 items-center justify-center w-[50%]"}>
                <IconLabelBox label="NW" Icon={FaCompass} />
                <IconLabelBox
                    label="Vinewood Blvd"
                    className="w-[20%]"
                    Icon={FaLocationDot}
                />
                <IconLabelBox
                    textClassName=""
                    label="Downtown Vinewood"
                    Icon={FaMap}
                />
            </div>
        </div>
    );
};
