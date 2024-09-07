import React from "react";
import type { IconType } from "react-icons";
import { FaCompass } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

interface IconLabelBoxProps {
    icon?: React.ComponentType<{ className?: string }>; // Use React.ComponentType with className
    label?: string;
    className?: string;
    textClassName?: string;
    iconClassName?: string; // Add iconClassName prop for styling the icon
}

const IconLabelBox = ({
    icon: Icon = FaCompass, // Default icon
    label = "NW",
    className = "",
    textClassName = "",
    iconClassName = "", // Default iconClassName
}: IconLabelBoxProps) => {
    return (
        <div
            className={twMerge(
                `flex items-center justify-center text-primary bg-black/20 rounded-[8px] p-[6px] min-w-[5dvw]`,
                className
            )}
        >
            <Icon className={twMerge("mr-2", iconClassName)} />{" "}
            {/* Apply iconClassName */}
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
