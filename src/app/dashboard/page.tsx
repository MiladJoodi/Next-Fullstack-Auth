// app/dashboard/page.tsx
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import LogoutButton from "@/components/LogoutButton";

const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

export default async function DashboardPage() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return <p className="text-red-500 text-center mt-12">Unauthorized. Please log in.</p>;
    }

    let payload;
    try {
      payload = (await jwtVerify(refreshToken, secret)).payload;
    } catch {
      return <p className="text-red-500 text-center mt-12">Session expired. Please log in again.</p>;
    }

    const userId = payload.userId as string;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return <p className="text-red-500 text-center mt-12">User not found.</p>;
    }

    return (
      <div className="max-w-2xl mx-auto mt-12 p-6 border rounded shadow bg-white">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name || user.email}!</h1>
        <p>This is your dashboard. Only logged-in users can see this page.</p>
        <p>Your email: {user.email}</p>

        <LogoutButton />
      </div>
    );
  } catch (err) {
    console.error(err);
    return <p className="text-red-500 text-center mt-12">Something went wrong.</p>;
  }
}
