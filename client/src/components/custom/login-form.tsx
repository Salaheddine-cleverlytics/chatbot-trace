"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {useState} from "react";
import {authService} from "@/services/auth-service.ts";
import {type LoginInput, LoginInputSchema} from "@repo/schema/user/user.input.ts"





export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const form = useForm<LoginInput>({
        resolver: zodResolver(LoginInputSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: LoginInput) {
        try {
            setLoading(true);
            const res = await authService.login(values);
            console.log("Login success:", res);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=" w-[70%] flex-col  justify-between  mt-10 p-10 ">
            <div className="leading-7  w-full ">
                <h2 className="font-sans font-black text-4xl">Welcome back!</h2>
                <p className="text-neutral-500">Enter to know what your agents are really doing</p>
            </div>
            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" font-black">Email</FormLabel>
                                <FormControl>
                                    <Input className=" p-5  border border-b-neutral-500 rounded-md" placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password"  className="border border-b-neutral-500 rounded-md" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full hover:bg-black rounded-lg  bg-[#FF6602]   font-extrabold text-white   " disabled={loading}>
                        {loading ? "Logging in..." : "Log In"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
