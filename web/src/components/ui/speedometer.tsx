interface SpeedometerProps {
    speed: number;
    maxSpeed: number;
    props?: React.HTMLAttributes<HTMLDivElement>;
}

export default function Speedometer(
    { speed, maxSpeed, props }: SpeedometerProps = { speed: 92, maxSpeed: 160 }
) {
    const percentage = (speed / maxSpeed) * 100;
    const arcLength = 240;
    const segments = 12;
    const segmentAngle = arcLength / segments;

    const polarToCartesian = (
        centerX: number,
        centerY: number,
        radius: number,
        angleInDegrees: number
    ) => {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        };
    };

    const createArc = (
        x: number,
        y: number,
        radius: number,
        startAngle: number,
        endAngle: number
    ) => {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return [
            "M",
            start.x,
            start.y,
            "A",
            radius,
            radius,
            0,
            largeArcFlag,
            0,
            end.x,
            end.y,
        ].join(" ");
    };

    const createGearLine = (
        centerX: number,
        centerY: number,
        innerRadius: number,
        outerRadius: number,
        angle: number
    ) => {
        const inner = polarToCartesian(centerX, centerY, innerRadius, angle);
        const outer = polarToCartesian(centerX, centerY, outerRadius, angle);
        return `M ${inner.x} ${inner.y} L ${outer.x} ${outer.y}`;
    };

    return (
        <div
            className="w-60 h-64 relative flex items-center justify-center -mb-20 z-0"
            {...props}
        >
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full transform rotate-[240deg]"
            >
                <defs>
                    <filter id="glow">
                        <feGaussianBlur
                            stdDeviation="2.5"
                            result="coloredBlur"
                        />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <g filter="url(#glow)">
                    {[...Array(segments)].map((_, i) => {
                        const startAngle = i * segmentAngle;
                        const endAngle = (i + 1) * segmentAngle;
                        const isActive =
                            startAngle <= (percentage / 100) * arcLength;
                        return (
                            <path
                                key={i}
                                d={createArc(
                                    49.5,
                                    50,
                                    40,
                                    startAngle,
                                    endAngle
                                )}
                                fill="none"
                                stroke={isActive ? "#94f024" : "#11181a27"}
                                strokeWidth="5"
                            />
                        );
                    })}
                </g>
                {[...Array(8)].map((_, i) => {
                    const angle = (i * arcLength) / 7;
                    return (
                        <g key={`gear-${i}`}>
                            <path
                                d={createGearLine(50, 50, 34, 38, angle)}
                                stroke="#ffffff"
                                strokeWidth="0.7"
                                opacity="0.7"
                            />
                        </g>
                    );
                })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center -skew-x-[10deg]">
                <div className="text-center flex flex-col">
                    <span className="text-4xl font-bold text-white tabular-nums">
                        {speed}
                    </span>
                    <span className="text-xl -mt-1 font-semibold text-gray-400">
                        MPH
                    </span>
                </div>
            </div>
        </div>
    );
}
