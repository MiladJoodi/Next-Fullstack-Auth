// app/dashboard/page.tsx
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { FaUser, FaHome } from "react-icons/fa";

const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

export default async function DashboardPage() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return (
        <p className="text-red-500 text-center mt-12">
          Unauthorized. Please log in.
        </p>
      );
    }

    let payload;
    try {
      payload = (await jwtVerify(refreshToken, secret)).payload;
    } catch {
      return (
        <p className="text-red-500 text-center mt-12">
          Session expired. Please log in again.
        </p>
      );
    }

    const userId = payload.userId as string;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return (
        <p className="text-red-500 text-center mt-12">User not found.</p>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <FaUser className="text-blue-600 text-3xl" />
            <h1 className="text-3xl font-bold">
              Welcome, {user.name || user.email}!
            </h1>
          </div>

          <p className="text-gray-600 mb-2">
            This is your dashboard. Only logged-in users can see this page.
          </p>
          <p className="text-gray-800 font-medium mb-6">
            Your email: <span className="text-blue-600">{user.email}</span>
          </p>

          <div className="flex gap-4">
            <LogoutButton />

            <Link
  href="/"
  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition cursor-pointer text-base font-medium"
>
  <FaHome className="text-gray-600 text-base" />
  Home
</Link>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error(err);
    return (
      <p className="text-red-500 text-center mt-12">
        Something went wrong.
      </p>
    );
  }
}
