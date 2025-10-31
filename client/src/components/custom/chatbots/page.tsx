"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { Columns } from "./columns";
import { chatbotService } from "@/services/chatbot-service.ts";
import { useAuthStore } from "@/store/auth-store.ts";
import { useChatbotStore } from "@/store/chatbot-store.ts";
import { Button } from "@/components/ui/button";
import { Plus, Bot, RefreshCw } from "lucide-react";

export default function ChatbotsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const user = useAuthStore((state) => state.user);
    const { chatbots, setChatbots } = useChatbotStore();

    const fetchChatbots = async (isRefresh = false) => {
        if (isRefresh) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }
        setError("");

        try {
            const response = await chatbotService.getAllChatbotByUser(user!.id);
            setChatbots(response.data.data);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to fetch chatbots");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        // Only fetch if chatbots haven't been loaded yet
        if (chatbots.length === 0) {
            fetchChatbots();
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    const handleRefresh = () => {
        fetchChatbots(true);
    };

    const handleCreateChatbot = () => {
        // Navigate to create chatbot page or open modal
        console.log("Create new chatbot");
    };

    if (loading) {
        return (
            <div className="container mx-auto p-14">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center space-y-3">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600">Loading chatbots...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-14">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                Failed to Load Chatbots
                            </h3>
                            <p className="text-red-600">{error}</p>
                        </div>
                        <Button
                            onClick={handleRefresh}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                        <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Chatbots</h1>
                        <p className="text-gray-500 mt-1">
                            Manage and monitor your AI assistants
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2"
                    >
                        <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button
                        onClick={handleCreateChatbot}
                        className="bg-orange-600 hover:bg-orange-700 flex text-white font-semibold items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        New Chatbot
                    </Button>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Chatbots</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {chatbots.length}
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                            <Bot className="h-6 w-6 text-orange-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Development</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {chatbots.filter(c => c.environment === 'dev').length}
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                            <span className="text-xl">🔧</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Production</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {chatbots.filter(c => c.environment === 'production').length}
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                            <span className="text-xl">🚀</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            {chatbots.length > 0 ? (
                <DataTable
                    columns={Columns}
                    data={chatbots}
                    searchable={true}
                    searchPlaceholder="Search chatbots by name or ID..."
                    paginated={true}
                    pageSize={10}
                />
            ) : (
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12">
                    <div className="text-center space-y-4">
                        <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                            <Bot className="h-10 w-10 text-gray-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                No Chatbots Yet
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Get started by creating your first AI chatbot
                            </p>
                            <Button
                                onClick={handleCreateChatbot}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Create Your First Chatbot
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}