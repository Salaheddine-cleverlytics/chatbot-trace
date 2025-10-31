

export const MessageCard = ({ label, message, color, icon: Icon }: { label: string; message: string; color: string; icon: React.ElementType }) => {


    return (
        <div className={`bg-${color}-100 border border-${color}-200 rounded-lg p-4 space-y-3`}>
            <div className="flex items-center justify-between">
                <h3 className={`text-sm font-semibold text-${color}-900 flex items-center gap-2`}>
                    <Icon className="h-4 w-4" /> {label}
                </h3>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
    );
};
