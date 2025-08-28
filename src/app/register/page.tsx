"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaHome } from "react-icons/fa";

// اسکیمای ولیدیشن
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post("/api/auth/register", data);
      setSuccessMsg(res.data.message);
      reset();
      setTimeout(() => router.push("/login"), 1000);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              {...register("name")}
              placeholder="Name"
              className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {errorMsg && <p className="text-red-500 text-center mt-2">{errorMsg}</p>}
          {successMsg && <p className="text-green-500 text-center mt-2">{successMsg}</p>}
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Login
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
