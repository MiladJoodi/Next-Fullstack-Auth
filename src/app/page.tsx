"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-6">
      {/* Header / Hero */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4">
          Welcome to Next Fullstack Auth
        </h1>
        <p className="text-lg text-blue-700 mb-6">
          A modern authentication system built with Next.js 15, TypeScript, Prisma, JWT, and Tailwind CSS.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>

      {/* Illustration / Image */}
      <div className="mt-12 relative w-full max-w-lg h-80">
        <Image
          src="/auth-illustration.png"
          alt="Authentication Illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Features / Info Section */}
      <div className="mt-16 max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Secure Login</h3>
          <p>Access your dashboard safely with JWT-based authentication.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">User Registration</h3>
          <p>Register with email and password. Passwords are securely hashed.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Protected Routes</h3>
          <p>Dashboard and other pages are protected. Only authenticated users can access.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-blue-800 text-center text-sm">
        &copy; {new Date().getFullYear()} Next Fullstack Auth. All rights reserved.
      </footer>
    </div>
  );
}
