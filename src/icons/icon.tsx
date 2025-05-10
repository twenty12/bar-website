import React from "react";

interface MySvgProps extends React.SVGProps<SVGSVGElement> {
    maxWidth?: string | number; // Allow string (e.g., "200px") or number (e.g., 200)
}

const Icon: React.FC<MySvgProps> = ({ maxWidth = "100px", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-0.5 -0.5 672 465"
        style={{ maxWidth, width: "100%", height: "auto",backgroundColor: "rgba(255, 255, 255, 0.1)",}}
        {...props}
    >
        <g>
            <rect
                x="5"
                y="4.39"
                width="660"
                height="453.61"
                fill="none"
                stroke="#000000"
                strokeWidth="10"
                pointerEvents="all"
            />
            <path
                d="M 205 458 L 326.42 4.84"
                fill="none"
                stroke="#000000"
                strokeWidth="10"
                strokeMiterlimit="10"
                pointerEvents="stroke"
            />
            <path
                d="M 4.34 273.38 L 205 458"
                fill="none"
                stroke="#000000"
                strokeWidth="10"
                strokeMiterlimit="10"
                pointerEvents="stroke"
            />
            <path
                d="M 665 418.08 L 414.2 5.75"
                fill="none"
                stroke="#000000"
                strokeWidth="10"
                strokeMiterlimit="10"
                pointerEvents="stroke"
            />
            <path
                d="M 5 278 Q 65 48 325 8"
                fill="none"
                stroke="#000000"
                strokeWidth="10"
                strokeMiterlimit="10"
                pointerEvents="stroke"
            />
        </g>
    </svg>
);

export default Icon;