import { TiHeartFullOutline } from "react-icons/ti";

interface StatBarProps {
    icon: React.ReactNode;
    value: number;
    maxValue: number;
    color: string;
    vertical?: boolean;
}

export const StatBar: React.FC<StatBarProps> = ({
    icon = <TiHeartFullOutline size={20} />,
    value = 20,
    maxValue = 100,
    color = "#747bff",
    vertical = false,
}) => {
    const percentage = (value / maxValue) * 100;

    return (
        <div
            className={`flex ${
                vertical ? "flex-col h-24" : "w-full"
            } items-center gap-1`}
        >
            {icon}
            {!vertical && <span className="text-xs font-medium">{value}</span>}
            <div
                className={`relative ${
                    vertical
                        ? "h-full w-2 rounded-[1px]"
                        : "w-full  rounded-[4px] ml-1 h-4"
                } bg-black/20 overflow-hidden`}
            >
                <div
                    className={`absolute  ${
                        vertical
                            ? "bottom-0 rounded-[1px] w-full"
                            : "left-0 h-full  rounded-[4px]"
                    } rounded-[4px] transition-all duration-300 ease-in-out`}
                    style={{
                        backgroundColor: color,
                        [vertical ? "height" : "width"]: `${percentage}%`,
                    }}
                />
            </div>
        </div>
    );
};
