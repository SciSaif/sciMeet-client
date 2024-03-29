import React from "react";
interface Props {
    width?: number;
    height?: number;
}

function PinIcon({ width = 25, height = 25 }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 100 100"
            className="text-white fill-white  "
        >
            <path d="M85.4 45L54.9 14.6c-2.8-2.9-3.5-1.1-3.5.3v14L28.7 45.7H15c-3.9 0-.8 4.2-1.4 3.5l17.2 17.1-14.4 14.5c-.8.8-.8 2.1 0 2.9.8.8 2.1.8 2.9 0l14.4-14.4 17.1 17.2c-.5-.5 3.6 2.2 3.6-1.4V71.3l16.8-22.7h12.7c2.1-.1 4.9-.1 1.5-3.6zm-65.5 4.6h8.9l21.7 21.7v8.9L19.9 49.6zm32.5 17.7L32.7 47.6 52.8 33l14.4 14.6-14.8 19.7zm17.8-22.7L55.4 29.8v-8.9l23.7 23.7h-8.9z"></path>
            <path
                fill="#00F"
                d="M804-1070V614H-980v-1684H804m8-8H-988V622H812v-1700z"
            ></path>
        </svg>
    );
}

export default PinIcon;
