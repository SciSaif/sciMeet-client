import { CopyIcon } from "lucide-react";
import { useState } from "react";
interface Props {
    size?: number;
    text: string;
}
const CopyButton = ({ size = 16, text }: Props) => {
    const [copied, setCopied] = useState(false);
    return (
        <button
            type="button"
            className={
                "text-slate-600 relative active:scale-105 active:text-blue-800 hover:text-slate-800 "
            }
            onClick={() =>
                navigator.clipboard
                    .writeText(text)
                    .then(() => setCopied(true))
                    .then(() => setTimeout(() => setCopied(false), 2000))
            }
        >
            <CopyIcon size={size} />
            {copied && (
                <span className="absolute bg-white shadow-lg rounded-xl px-2 py-1 -top-1 translate-x-full text-slate-600 -right-2 ">
                    Copied!
                </span>
            )}
        </button>
    );
};

export default CopyButton;
