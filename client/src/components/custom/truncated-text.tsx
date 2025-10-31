import {Button} from "@/components/ui/button.tsx";
import {CopyButton} from "@/components/custom/copy-button.tsx";
import {useState} from "react";


type TruncatedTextProps = {
    text: string;
    maxLength?: number;
};

export const TruncatedText = ({ text, maxLength = 60 }: TruncatedTextProps) => {
    const [expanded, setExpanded] = useState(false);
    const shouldTruncate = text.length > maxLength;

    return (
        <div className="flex items-start gap-2 group">
            <span className="text-sm text-gray-700 flex-1">
                {expanded || !shouldTruncate ? text : `${text.slice(0, maxLength)}...`}
            </span>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {shouldTruncate && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpanded(!expanded)}
                        className="h-6 px-2 text-xs hover:bg-gray-100"
                    >
                        {expanded ? "Less" : "More  "}
                    </Button>
                )}
                <CopyButton text={text} />
            </div>
        </div>
    );
};
