import React from "react";
import type { IconType } from "react-icons";
import { FaCompass } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

interface IconLabelBoxProps {
    icon?: React.ComponentType<{ className?: string }>;
    label?: string;
    className?: string;
    textClassName?: string;
    iconClassName?: string;
}

const IconLabelBox = ({
    icon: Icon = FaCompass,
    label = "NW",
    className = "",
    textClassName = "",
    iconClassName = "",
}: IconLabelBoxProps) => {
    return (
        <div
            className={twMerge(
                `flex items-center h-[3.2dvh] justify-center text-primary bg-black/50 rounded-[8px] p-[6px] min-w-[5dvw]`,
                className
            )}
        >
            <Icon className={twMerge("mr-2", iconClassName)} />{" "}
            <p
                className={twMerge(
                    `text-center text-white font-bold text-sm`,
                    textClassName
                )}
                style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                {label}
            </p>
        </div>
    );
};

export default IconLabelBox;
