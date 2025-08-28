"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      router.push("/login");
    } catch {
      setError("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleLogout}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaSignOutAlt className="text-gray-600" />
        {loading ? "Logging out..." : "Logout"}
      </button>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
}
