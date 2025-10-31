import {SidebarFooter} from "@/components/ui/sidebar.tsx";
import {Bolt} from "lucide-react";


export default function DashboardFooter (){

    return(
        <SidebarFooter className="p-4 bg-white">
            <div className="space-y-2">
                <a
                    href="/settings"
                    className="flex font-semibold text-md text-black items-center gap-3 hover:ml-3 transition-all duration-300"
                >
                    <Bolt className="font-extrabold w-4 text-black" />
                    Settings
                </a>
                <button
                    onClick={() => console.log("Logging out...")}
                    className="flex items-center gap-3 text-sm font-medium hover:text-[#FF6602] transition-all duration-300"
                >
                    Logout
                </button>
            </div>
        </SidebarFooter>
    )
}