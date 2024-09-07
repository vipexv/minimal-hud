import { TiHeartFullOutline } from "react-icons/ti";
import { useMemo } from "react";

interface StatBarProps {
    icon?: React.ReactNode;
    value?: number;
    maxValue?: number;
    color?: string;
    vertical?: boolean;
}

export const StatBar = ({
    icon = <TiHeartFullOutline size={20} />,
    value = 20,
    maxValue = 100,
    color = "#94f024",
    vertical = false,
    ...props
}: StatBarProps) => {
    const percentage = useMemo(
        () => (value / maxValue) * 100,
        [value, maxValue]
    );

    return (
        <div
            className={`flex ${
                vertical ? "flex-col h-24" : "w-full"
            } items-center gap-1`}
            {...props}
        >
            <div className={`text-white/70`}>{icon}</div>
            {!vertical && (
                <p
                    className="text-xs w-[20px] text-center font-bold"
                    style={{
                        color: color,
                    }}
                >
                    {value}
                </p>
            )}
            <div
                className={`relative ${
                    vertical ? "h-full w-2" : "w-full ml-1 h-2"
                } bg-black/20  rounded-[1px] overflow-hidden`}
            >
                <div
                    className={`absolute ${
                        vertical ? "bottom-0 w-full" : "left-0 h-full"
                    } transition-allduration-300 rounded-[1px] ease-in-out`}
                    style={{
                        backgroundColor: color,
                        [vertical ? "height" : "width"]: `${percentage}%`,
                    }}
                />
            </div>
        </div>
    );
};

interface StatBarSegmentedProps {
    icon?: React.ReactNode;
    value?: number;
    color?: string;
}

export const StatBarSegmented = ({
    icon = <TiHeartFullOutline size={20} />,
    value = 20,
    color = "#94f024",
}: StatBarSegmentedProps) => {
    const segments = 4;
    const segmentWidth = 100 / segments;

    const segmentFills = useMemo(
        () =>
            Array.from({ length: segments }, (_, i) => {
                const segmentMaxValue = ((i + 1) * 100) / segments;
                if (value >= segmentMaxValue) {
                    return 100;
                } else if (value > (i * 100) / segments) {
                    return (
                        ((value - (i * 100) / segments) / segmentWidth) * 100
                    );
                } else {
                    return 0;
                }
            }),
        [value, segments, segmentWidth]
    );

    return (
        <div className="flex items-center gap-1 w-full">
            <div className="text-white/70">{icon}</div>
            <p
                className="text-xs w-[20px] text-center font-bold"
                style={{ color: color }}
            >
                {value}
            </p>
            <div className="relative flex gap-3 w-full ml-1 h-[8px] rounded-[1px]">
                {segmentFills.map((fill, index) => (
                    <svg
                        key={index}
                        width="100%"
                        height="100%"
                        className={"rounded-full"}
                        viewBox="0 0 100 24"
                        preserveAspectRatio="none"
                    >
                        <rect
                            x="0"
                            y="0"
                            width="100"
                            height="24"
                            className={"fill-black/20"}
                        />
                        <rect
                            x="0"
                            y="0"
                            width={fill}
                            height="24"
                            fill={color}
                            className={"transition-all"}
                        />
                    </svg>
                ))}
            </div>
        </div>
    );
};
