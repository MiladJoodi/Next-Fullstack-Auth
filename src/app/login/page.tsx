"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaHome, FaLock } from "react-icons/fa";

// اسکیمای ولیدیشن
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        setErrorMsg("");

        try {
            await axios.post("/api/auth/login", data, { withCredentials: true });

            reset();
            router.push("/dashboard");
        } catch (err: any) {
            setErrorMsg(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="email"
                                {...register("email")}
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="password"
                                {...register("password")}
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {errorMsg && (
                        <p className="text-red-500 text-center mt-2">{errorMsg}</p>
                    )}
                </form>

                <p className="mt-6 text-center text-gray-700">
                    Don&apos;t have an account?{" "}
                    <button
                        onClick={() => router.push("/register")}
                        className="text-blue-500 font-medium underline hover:text-blue-600 cursor-pointer"
                    >
                        Register
                    </button>
                </p>
                
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                    >
                        <FaHome className="text-gray-600" />
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
}
