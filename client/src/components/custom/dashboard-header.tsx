import { Link, useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { useAuthStore } from "@/store/auth-store.ts";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Helper: check if a string is likely an ID (MongoDB style)
const isId = (segment: string) => /^[0-9a-f]{24}$/i.test(segment);

// Optional mapping for display names
const segmentNameMap: Record<string, string> = {
    traces: "Traces",
    dashboard: "Dashboard",
    users: "Users",
};

export function DashboardHeader() {
    const { user } = useAuthStore();
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean);

    return (
        <header className="flex w-full flex-col bg-white px-6 py-4 shadow-sm">
            {/* Top row */}
            <div className="flex w-full items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <SidebarTrigger />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-[#FF6602]">
                        <span className="font-medium">{user.name}</span>
                    </div>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="mt-2">
                <Breadcrumb>
                    <BreadcrumbList>
                        {segments.map((segment, index) => {
                            if (isId(segment)) return null; // skip IDs

                            const path = "/" + segments.slice(0, index + 1).join("/");
                            const isLast = index === segments.length - 1;

                            const displayName =
                                segmentNameMap[segment.toLowerCase()] ||
                                segment.charAt(0).toUpperCase() + segment.slice(1);

                            return (
                                <BreadcrumbItem key={path}>
                                    {isLast ? (
                                        <BreadcrumbPage>{displayName}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link to={path}>{displayName}</Link>
                                        </BreadcrumbLink>
                                    )}
                                    {index < segments.length - 1 && <BreadcrumbSeparator />}
                                </BreadcrumbItem>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
