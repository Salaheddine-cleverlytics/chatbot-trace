"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MessageSquare,
    Mic,
    Clock,
    User,
    Eye,
    ArrowUpDown,
} from "lucide-react";
import {TruncatedText} from "@/components/custom/truncated-text.tsx";
import {Sheet, SheetTrigger} from "@/components/ui/sheet.tsx";
import TraceDetails from "@/components/custom/trace-details/trace-details.tsx";

export type Trace = {
    id?: string;
    question: string;
    response: string;
    user: string;
    total_processing_time_sec: number;
    message_type: "text" | "audio";
};






export const Columns: ColumnDef<Trace>[] = [
    {
        accessorKey: "user",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-transparent p-0 h-auto font-semibold"
                >
                    <User className="mr-2 h-4 w-4" />
                    User
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f7995c] to-[#FF6602] flex items-center justify-center text-white text-xs font-semibold">
                    {row.original.user.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-900">{row.original.user}</span>
            </div>
        ),
    },
    {
        accessorKey: "message_type",
        header: "Type",
        cell: ({ row }) => {
            const type = row.original.message_type;
            return (
                <Badge
                    variant="outline"
                    className={`flex items-center gap-1.5 w-fit px-2.5 py-1 ${
                        type === "audio"
                            ? "bg-purple-50 text-purple-700 border-purple-300"
                            : "bg-orange-50 text-orange-600 border-orange-300"
                    }`}
                >
                    {type === "audio" ? (
                        <Mic className="h-3.5 w-3.5" />
                    ) : (
                        <MessageSquare className="h-3.5 w-3.5" />
                    )}
                    <span className="font-medium capitalize">{type}</span>
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "question",
        header: "Question",
        cell: ({ row }) => <TruncatedText text={row.original.question} maxLength={80} />,
    },
    {
        accessorKey: "response",
        header: "Response",
        cell: ({ row }) => <TruncatedText text={row.original.response} maxLength={80} />,
    },
    {
        accessorKey: "total_processing_time_sec",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-transparent p-0 h-auto font-semibold"
                >
                    <Clock className="mr-2 h-4 w-4" />
                    Processing Time
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const time = row.original.total_processing_time_sec;
            const isSlowResponse = time > 5;
            const isVerySlowResponse = time > 10;

            return (
                <div className="flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className={`font-mono text-sm ${
                            isVerySlowResponse
                                ? "bg-red-50 text-red-700 border-red-300"
                                : isSlowResponse
                                    ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                                    : "bg-green-50 text-green-700 border-green-300"
                        }`}
                    >
                        {time.toFixed(2)}s
                    </Badge>
                </div>
            );
        },
        sortingFn: "basic",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 hover:bg-gray-50"
                    >
                        <Eye className="h-4 w-4" />
                        View
                    </Button>
                </SheetTrigger>
                <TraceDetails trace={row.original} />
            </Sheet>
        ),
    },
];