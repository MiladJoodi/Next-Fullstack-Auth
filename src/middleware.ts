import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const url = req.nextUrl.clone();

const isProtectedPage = url.pathname.startsWith("/dashboard");


  if (!refreshToken) {
    if (isProtectedPage) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  try {
    await jwtVerify(refreshToken, secret);

    // اگر کاربر login هست و login/register رفته، redirect به dashboard
    if (url.pathname === "/login" || url.pathname === "/register") {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch {
    if (isProtectedPage) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};

