import { api } from "@/lib/api";
import type {LoginInput} from "@repo/schema/user/user.input.ts";
import {useAuthStore} from "@/store/auth-store.ts";

export const authService = {
    async login(data:LoginInput) {
        try {
        const result = await api.post("/auth/login", data);
        const response = result.data.data;
        const user = {
            id: response.id,
            name: response.name,
            email: response.email,
            role: response.role,
        };
        const token = response.token;
        useAuthStore.getState().setUser(user, token);
        return { success: true };
        }catch (error) {
            console.error(error);
            return { success: false, message: error.response?.data?.message || error.message };
        }
    },

    async register(data:LoginInput) {
        const result = await api.post("/auth/register", data);
        const response = result.data.data;
        const user = {
            id: response.id,
            name: response.name,
            email: response.email,
            role: response.role,
        };

        const token = response.token;
        const { setUser } = useAuthStore.getState();
        setUser(user, token);

        return { success: true };
    },


};
