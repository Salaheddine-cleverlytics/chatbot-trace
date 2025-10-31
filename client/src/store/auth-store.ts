
import { create } from "zustand";
import {persist} from "zustand/middleware";

type User = {
    id: string;
    name: string;
    email: string;
    role:string
};

type AuthStore = {
    user: User | null;
    token: string | null;
    setUser: (user: User, token: string) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setUser: (user, token) => set({ user, token }),
            logout: () => set({ user: null, token: null }),
        }),
        { name: "auth-storage" }
    )
);