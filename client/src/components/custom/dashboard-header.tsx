import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {useAuthStore} from "@/store/auth-store.ts";


export function DashboardHeader() {
    const {user} = useAuthStore()
    return (
        <header className="flex w-full items-center justify-between bg-white px-6 py-4 shadow-sm">
            <div className="flex items-center gap-3">
                <SidebarTrigger />
                <h1 className="text-lg font-bold text-[#FF6602] tracking-tight">
                    Dashboard
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer hover:text-[#FF6602]">
                    <span className="font-medium">{user.name}</span>
                </div>
            </div>
        </header>
    )
}