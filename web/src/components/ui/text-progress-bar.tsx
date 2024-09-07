import { useMemo } from "preact/hooks";

export const TextProgressBar = ({
    value = 50,
    label = "FUEL",
    color = "#94f024",
    props,
}: {
    value?: number;
    label?: string;
    color?: string;
    props?: React.HTMLAttributes<HTMLDivElement>;
}) => {
    const getColor = useMemo(() => {
        if (value <= 20) return "#f70101";
        if (value <= 50) return "#f7e300";
        return color;
    }, [color, value]);

    return (
        <div
            className={
                "flex flex-col items-center justify-center w-[2.5dvw] h-[4dvh] -skew-x-[10deg]"
            }
            {...props}
        >
            <h1 className={"uppercase text-base font-geist font-bold"}>
                {label}
            </h1>

            <div
                className={
                    "relative w-[80%] bg-black/20 shadow h-[3.5px] rounded-full"
                }
            >
                <div
                    className={`absolute max-w-full transition-all rounded-full shadow left-0 h-full z-20 ${
                        value <= 20
                            ? "shadow-red-600"
                            : value <= 50
                            ? "shadow-yellow-500"
                            : "shadow-primary"
                    }`}
                    style={{
                        width: `${value}%`,
                        backgroundColor: getColor, // Use getColor directly
                    }}
                ></div>
            </div>
        </div>
    );
};