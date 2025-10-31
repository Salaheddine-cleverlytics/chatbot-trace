import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTraceStore } from "@/store/trace-store";
import { traceService } from "@/services/trace-service";
import { DataTable } from "@/components/custom/traces/data-table.tsx";
import { Columns } from "@/components/custom/traces/columns.tsx";

export default function TracesPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { setTraces, traces } = useTraceStore();

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
            } catch (err) {
                console.error(err);
                setError(err.message || "Failed to fetch traces");
            } finally {
                setLoading(false);
            }
        }

        fetchTraces();
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
        <div className="container  mx-auto p-8  space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Conversation Traces</h1>
                    <p className="text-gray-500 mt-1">
                        Monitor and analyze chatbot interactions
                    </p>
                </div>
                <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
                    <span className="font-semibold">{traces.length}</span> {traces.length === 1 ? 'trace' : 'traces'}
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