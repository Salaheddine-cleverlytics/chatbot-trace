import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {Trace} from "@/shared/types.ts";


interface TraceStore {
    traces: Trace[];
    loading: boolean;
    error: string | null;


    setTraces: (traces: Trace[]) => void;
    addTrace: (trace: Trace) => void;
    clearTraces: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    findTraceById: (id: string) => Trace | undefined;
}

export const useTraceStore = create<TraceStore>()(
    persist(
        (set, get) => ({
            traces: [],
            loading: false,
            error: null,

            setTraces: (traces) => set({ traces }),
            addTrace: (trace) =>
                set((state) => ({ traces: [...state.traces, trace] })),
            clearTraces: () => set({ traces: [] }),
            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),
            findTraceById: (id) => get().traces.find((t) => t.id === id),
        }),
        {
            name: "trace-storage",
        }
    )
);
