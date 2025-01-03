import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

//Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

//set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        //Ask OpenAI for a streaming chat completion response
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages,
          stream: true,
        });

        //Convert the response into a friendly text-stream
        const stream = OpenAIStream(response);
        //Respond with the stream
        return new StreamingTextResponse(stream);
    } catch (error) {
        if(error instanceof OpenAI.APIError){
            const { name, status, headers message } = error;
            return NextResponse.json({
                name, status, headers, message
            })

        }else{
            console.error("An unepeted error occured", error);
            throw error
        }

    }
    
}