import React from "react";
import { FaCompass } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface IconLabelBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  Icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
}

const IconLabelBox: React.FC<IconLabelBoxProps> = ({
  Icon: Icon = FaCompass,
  label = "NW",
  className = "",
  textClassName = "",
  iconClassName = "",
  ...props
}) => {
  return (
    <div
      className={twMerge(
        `flex items-center h-[3.2dvh] justify-center text-primary bg-black/50 rounded-[8px] p-[6px] min-w-[5dvw]`,
        className
      )}
      {...props}
    >
      <Icon
        className={twMerge(
          "mr-2 2k:text-lg 4k:text-2xl",
          iconClassName
        )}
      />
      <p
        className={twMerge(
          `text-center text-white font-bold 4k:text-2xl text-sm 2k:text-base`,
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
