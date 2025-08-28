"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-200">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 bg-white/60 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-800">Next Auth</h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition cursor-pointer"
          >
            Register
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
          >
            Dashboard
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 mt-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-blue-800 mb-4"
        >
          Secure & Modern Authentication
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg text-blue-700 mb-8 max-w-2xl"
        >
          Built with Next.js 15, TypeScript, Prisma, JWT, and Tailwind. A perfect starting point for secure fullstack apps.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex gap-4"
        >
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:shadow-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Get Started
          </button>
          <a
            href="https://github.com/MiladJoodi/Next-Fullstack-Auth"
            target="_blank"
            className="px-6 py-3 flex items-center gap-2 bg-gray-800 text-white rounded-xl shadow-md hover:shadow-lg hover:bg-gray-900 transition cursor-pointer"
          >
            <FaGithub size={20} /> GitHub
          </a>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-12 relative w-full max-w-lg h-80"
        >
          <Image
            src="/auth-illustration.png"
            alt="Authentication Illustration"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </main>

      {/* Features */}
      <section className="mt-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {[
          { title: "Secure Login", desc: "JWT-based auth with refresh tokens." },
          { title: "User Registration", desc: "Secure password hashing with Prisma." },
          { title: "Protected Routes", desc: "Access dashboard only if logged in." },
        ].map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold mb-3 text-blue-800">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-sm text-blue-800 bg-white/70 backdrop-blur-md">
        &copy; {new Date().getFullYear()} Next Fullstack Auth. Built by{" "}
        <a
          href="https://github.com/MiladJoodi"
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          Milad Joodi
        </a>
      </footer>
    </div>
  );
}
