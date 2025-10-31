import LoginPage from "@/pages/login.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/dashboard.tsx";
import ChatbotsPage from "@/components/custom/chatbots/page.tsx";
import TracesPage from "@/components/custom/traces/page.tsx";
import { useAuthStore } from "@/store/auth-store.ts";


function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
}
function PublicRoute({ children }: { children: React.ReactNode }) {
    const user = useAuthStore((state) => state.user);

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                <Route
                    path="/auth"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<ChatbotsPage />} />
                    <Route path="chatbots" element={<ChatbotsPage />} />
                    <Route path="traces/:id" element={<TracesPage/>
                    } />
                </Route>

                <Route
                    path="*"
                    element={
                        <div className="flex items-center justify-center h-screen bg-gray-50">
                            <div className="text-center space-y-4">
                                <h1 className="text-6xl font-bold text-gray-900">404</h1>
                                <p className="text-xl text-gray-600">Page not found</p>
                                <a
                                    href="/dashboard"
                                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Go to Dashboard
                                </a>
                            </div>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}