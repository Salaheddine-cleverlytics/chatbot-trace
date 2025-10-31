









export const MetricItem = ({ label, value, unit = "s" }: { label: string; value: number; unit?: string }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="font-mono text-sm font-semibold text-gray-900">
            {value.toFixed(3)}{unit}
        </span>
    </div>
);
