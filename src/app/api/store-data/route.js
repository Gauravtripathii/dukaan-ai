import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {

        const { forecast } = await request.json();
        const token = jwt.sign(forecast, process.env.TOKEN_SECRET, {expiresIn: "1d"});
        const response = NextResponse.json({
            message: "Forecast Data Added",
            success: true
        });
        response.cookies.set("token", token, {httpOnly: true});
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
