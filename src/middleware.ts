import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("refreshToken")?.value;

  // اگر توکن وجود نداشت، رد می‌کنیم
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await jwtVerify(token, secret);
    // اگر درست بود، ادامه مسیر
    return NextResponse.next();
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// مسیرهایی که می‌خوای این middleware روی اونها اعمال بشه
export const config = {
  matcher: ["/api/private/:path*"],
};
