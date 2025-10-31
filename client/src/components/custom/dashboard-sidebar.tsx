import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {UserRoundPen, Bot, ChevronUp, ChevronDown} from "lucide-react";
import {Collapsible} from "@radix-ui/react-collapsible";
import {CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {useChatbotStore} from "@/store/chatbot-store.ts";
import DashboardFooter from "@/components/custom/dashboard-footer.tsx";
import {Link} from "react-router-dom";
import {useState} from "react";

const items = [
    {
        title: "Profile",
        url: "/profile",
        icon: UserRoundPen,
    },
];

export default function DashboardSidebar() {
    const {chatbots} =useChatbotStore();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sidebar className="border-none  transition-all duration-300">
            <SidebarHeader className="p-4 text-center bg-white">
                <h1 className="text-xl font-bold text-black tracking-wide">
                    Chatbot Tracer
                </h1>
            </SidebarHeader>
            <SidebarContent className="bg-white">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[#FF6602] font-semibold text-md tracking-wide">
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a
                                            href={item.url}
                                            className="flex items-center gap-4 hover:ml-3 p-4 transition-all duration-300"
                                        >
                                            <item.icon className="font-black" />
                                            <span className="font-semibold text-md">
                                                {item.title}
                                            </span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <Collapsible onClick={() => setIsOpen(!isOpen)}  className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                <SidebarMenuButton className=" flex justify-between items-center transition-all duration-300 font-semibold text-md hover:ml-3">
                                    <Link
                                        className="flex items-center gap-4 p-1"
                                    to="/dashboard/chatbots"

                                    >

                                    <Bot className="font-semibold w-5" />
                                    <span>Chatbot</span>
                                    </Link>
                                    {isOpen ? (
                                        <ChevronUp className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-400" />
                                    )}
                                </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                <SidebarMenuSub>
                                    {chatbots.map((chatbot) => (
                                        <SidebarMenuSubItem >
                                            <SidebarMenuSubButton className="py-3 font-normal h-10" asChild>
                                                <Link
                                                    to={`/dashboard/traces/${chatbot.id}`}
                                                    className="pl-10 text-sm hover:text-[#FF6602] transition-colors"
                                                >
                                                    {chatbot.name}
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                            </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
           <DashboardFooter/>
        </Sidebar>
    );
}
