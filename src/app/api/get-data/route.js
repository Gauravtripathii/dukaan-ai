import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
    try {
        const token = request.cookies.get("token")?.value;
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return NextResponse.json({ forecast: decodedToken }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
