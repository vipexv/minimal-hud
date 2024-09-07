import Speedometer from "./ui/speedometer";
import { TextProgressBar } from "./ui/text-progress-bar";

export const CarHud = () => {
    return (
        <div
            className={
                "absolute bottom-1 right-1 w-[20dvw] h-[30dvh] flex-col items-center flex justify-center gap-[18px]"
            }
        >
            <Speedometer rpm={20} speed={50} maxSpeed={100} />
            <div className={"flex gap-2 items-center -mb-10"}>
                <TextProgressBar label="FUEL" value={50} />
                <TextProgressBar label="ENG" value={100} />
                <TextProgressBar label="BELT" value={100} />
            </div>
        </div>
    );
};
