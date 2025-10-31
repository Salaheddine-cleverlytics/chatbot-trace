import DashboardSidebar from "@/components/custom/dashboard-sidebar.tsx";
import { SidebarProvider } from "@/components/ui/sidebar"
import {Outlet} from "react-router-dom";
import {DashboardHeader} from "@/components/custom/dashboard-header.tsx";


export default function  Dashboard() {
   return (
       <SidebarProvider>
           <div className="flex bg-[#F9FAFB] w-full h-screen overflow-hidden">
               <DashboardSidebar />
               <main className="flex-1 flex flex-col">
                   <DashboardHeader />
                   <div className="flex-1 overflow-hidden">
                       <Outlet />
                   </div>
               </main>
           </div>
       </SidebarProvider>
   )
}