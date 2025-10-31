"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export type Chatbot = {
    id: string;
    name: string;
    environment: "dev" | "production";
    developerId: string;
    clients: string[];
    createdAt?: Date | string;
};

export const Columns: ColumnDef<Chatbot>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
            <span className="text-gray-700 font-medium truncate max-w-[200px] block">
                {row.original.id}
            </span>
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <span className="font-semibold text-gray-900">{row.original.name}</span>
        ),
    },
    {
        accessorKey: "environment",
        header: "Environment",
        cell: ({ row }) => {
            const env = row.original.environment;
            return (
                <Badge
                    variant="outline"
                    className={`px-2 py-1 rounded-lg text-sm font-semibold ${
                        env === "production"
                            ? "bg-green-100 text-green-700 border-green-400"
                            : "bg-orange-100 text-orange-700 border-orange-400"
                    }`}
                >
                    {env === "production" ? "Production" : "Development"}
                </Badge>
            );
        },
    },
    {
        accessorKey: "clients",
        header: "Clients",
        cell: ({ row }) => (
            <span className="text-gray-600 text-sm">
                {row.original.clients.length > 0
                    ? `${row.original.clients.length} client${row.original.clients.length > 1 ? 's' : ''}`
                    : "No clients"}
            </span>
        ),
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            const createdAt = row.original.createdAt;
            if (!createdAt) {
                return <span className="text-gray-400 text-sm">N/A</span>;
            }
            try {
                return (
                    <span className="text-gray-600 text-sm">
                        {format(new Date(createdAt), "dd MMM yyyy")}
                    </span>
                );
            } catch {
                return <span className="text-gray-400 text-sm">Invalid date</span>;
            }
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => console.log("Edit", row.original.id)}
                    className="hover:text-blue-600"
                >
                    <Pencil className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => console.log("Delete", row.original.id)}
                    className="hover:text-red-600"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        ),
    },
];