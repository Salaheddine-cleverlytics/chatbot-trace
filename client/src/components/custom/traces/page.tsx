import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useTraceStore } from "@/store/trace-store";
import { traceService } from "@/services/trace-service";
import { DataTable } from "@/components/custom/traces/data-table.tsx";
import { Columns } from "@/components/custom/traces/columns.tsx";
import { MessageSquare, Zap, Clock, TurtleIcon as Turtle } from "lucide-react";

export default function TracesPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { setTraces, traces } = useTraceStore();

    // Calculate performance metrics
    const performanceStats = useMemo(() => {
        const fast = traces.filter(t => t.total_processing_time_sec <= 15).length;
        const slow = traces.filter(t => t.total_processing_time_sec > 15 && t.total_processing_time_sec <= 20).length;
        const verySlow = traces.filter(t => t.total_processing_time_sec > 20).length;

        return { fast, slow, verySlow };
    }, [traces]);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        async function fetchTraces() {
            setLoading(true);
            setError("");
            try {
                const response = await traceService.getTracesByChatbotId(id);
                setTraces(response.data.data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Failed to fetch traces");
            } finally {
                setLoading(false);
            }
        }

        fetchTraces();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto p-14">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center space-y-3">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                        <p className="text-gray-600">Loading traces...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-14">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center space-y-3">
                        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <p className="text-red-600 font-medium">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-1">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Conversation Traces</h1>
                <p className="text-gray-500 mt-[0.5px]">
                    Monitor and analyze chatbot interactions
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Total Traces */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Traces</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {traces.length}
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <MessageSquare className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Fast Responses */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Fast</p>
                            <p className="text-2xl font-bold text-green-700 mt-1">
                                {performanceStats.fast}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">≤ 15s</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <Zap className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Slow Responses */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Slow</p>
                            <p className="text-2xl font-bold text-yellow-700 mt-1">
                                {performanceStats.slow}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">15-20s</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                {/* Very Slow Responses */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Very Slow</p>
                            <p className="text-2xl font-bold text-red-700 mt-1">
                                {performanceStats.verySlow}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">&gt; 20s</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                            <Turtle className="h-6 w-6 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            <DataTable
                columns={Columns}
                data={traces}
                searchable={true}
                searchPlaceholder="Search traces..."
                paginated={true}
                pageSize={15}
            />
        </div>
    );
}