import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }


        // find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // verify password
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }


        // ساخت JWT
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const accessToken = await new SignJWT({ userId: user.id })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("15m")
            .sign(secret);

        const refreshToken = await new SignJWT({ userId: user.id })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("7d")
            .sign(secret);

        // save refresh token in DB
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });

        return NextResponse.json({
            message: "Login successful",
            accessToken,
            refreshToken,
        });





    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
