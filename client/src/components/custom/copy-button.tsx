"use client";

import { useState } from "react";
import {Button} from "@/components/ui/button.tsx";
import {Check, Copy} from "lucide-react";

type CopyButtonProps = {
    text: string;
};

export const CopyButton = ({ text }: CopyButtonProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 w-6 p-0 hover:bg-gray-100"
        >
            {copied ? (
                <Check className="h-3 w-3 text-green-600" />
            ) : (
                <Copy className="h-3 w-3 text-orange-500" />
            )}
        </Button>
    );

};
