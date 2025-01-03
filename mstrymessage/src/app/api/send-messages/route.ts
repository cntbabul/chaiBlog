import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

import { Message } from "@/model/user";

export async function POST(request: Request) {
  const { username, content } = await request.json({});

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json({
        success:false,
        message:"User not found"
      },{status:404}
    )
    }
    //is user accepting messages
    if (!user.isAcceptingMessages) {
      return Response.json({
        success:false,
        message:"User is not accepting messages"
      },{status:403}
    )
    const newMessage = {content, createdAt: new Date();
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json({
      success:true,
      message:"Message sent"
    },
    {status:200}
    )
    }
    


  } catch (error) {
    console.log("Error sending message",error);
    return Response.json({
      success:false,
      message:"Internal server error"
    },{status:500})

  }
}}
