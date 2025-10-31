



export const UserInfo = ({ user }: { user: string }) => (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            User Information
        </h3>
        <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#f7995c] to-[#FF6602] flex items-center justify-center text-white font-semibold">
                {user.charAt(0).toUpperCase()}
            </div>
            <div>
                <p className="font-medium text-gray-900">{user}</p>
                <p className="text-sm text-gray-500">User Name</p>
            </div>
        </div>
    </div>
);
