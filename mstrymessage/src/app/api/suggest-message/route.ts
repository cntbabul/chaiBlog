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
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated bu '||'. These questions are for an anonnymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themesthat enourage friendly interactoon. For example, your output should be structured like this: 'Whats's a hobby you've recently started? || If you ould have dinner with any historical figure, who would it be? || Whats's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational emvironment.";

    //Ask OpenAI for a streaming chat completion response
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 400,
      stream: true,
      prompt,
    });

    //Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    //Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({
        name,
        status,
        headers,
        message,
      });
    } else {
      console.error("An unepeted error occured", error);
      throw error;
    }
  }
}
