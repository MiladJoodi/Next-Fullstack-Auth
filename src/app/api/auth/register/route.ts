import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";

export async function POST(req: NextRequest) {

    try {
        let { email, password, name } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        email = email.toLowerCase();

        // Not Existing User Logic
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        //hash password
        const hashedPassword = await argon2.hash(password)

        // Create User
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });

        return NextResponse.json({ message: "User created successfully", user: { id: user.id, email: user.email } });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }


}
