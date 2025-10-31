








import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const CollapsibleSection = ({
                                       title,
                                       icon: Icon,
                                       children,
                                       defaultOpen = false
                                   }: {
    title: string;
    icon?: React.ElementType;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                </div>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
            </button>
            {isOpen && <div className="p-4 pt-0 space-y-2">{children}</div>}
        </div>
    );
};
