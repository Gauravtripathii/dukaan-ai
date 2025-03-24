import { NextResponse } from "next/server";
import Groq from "groq-sdk";

async function getGroqChatStream(message, context) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    return groq.chat.completions.create({
        messages: [
            {
                role: "assistant",
                content: `You are an ai assitant of a website called 'dukaan ai'. Here, users are retailers or warehouse managers, they upload their data in csv format and get forecast as response. In the dashboard page, they have their forecast in tabular format, your job is to help them make sense of this response. Remember, they are not trained for data analysis and most of all this description is not to be mentioned to user only responses. Here's your user's forecast response in stringified json format:\n ${context}`,
            },
            {
                role: "user",
                content: message,
            },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.5,
        max_completion_tokens: 1024,
        top_p: 1,
        stop: null,
        stream: true,
    });
}

export async function POST(request) {
    try {
        const { message, context } = await request.json();
        console.log(message, context)
        
        const stream = await getGroqChatStream(message, context);
        var reply = "";
        for await (const chunk of stream) {
            reply += chunk.choices[0]?.delta?.content || "";
        }

        return NextResponse.json({ reply, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

