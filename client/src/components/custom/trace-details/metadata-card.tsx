
import { Badge } from "@/components/ui/badge";





export const MetadataCard = ({ label, value, colorClasses }: { label: string; value: string; colorClasses: string }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
        <span className="text-xs font-semibold text-gray-500 uppercase">{label}</span>
        <Badge variant="outline" className={colorClasses}>
            {value}
        </Badge>
    </div>
);
