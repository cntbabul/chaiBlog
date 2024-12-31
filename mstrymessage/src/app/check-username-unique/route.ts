import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
    // if (request.method != 'GET'){
    //     return Response.json({
    //         success:false,
    //         message: "Method not allowed"
    //     },{status:405})
    // }
  await dbConnect();
  //   localhost:3000/api/cuu?username=hitesh?phone=android

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    //validate with zod ==================
    UsernameQuerySchema.safeParse(queryParam);
    console.log(result);
    if (!result.success) {
      const usernameErrors = result.error.format();
      username?._errors || [];
      return Response.json({
        success: false,
        message:
          usernameErrors?.length > 0
            ? usernameErrors.join(",")
            : "Invalid query parameters",
      });
    }
    const {username} = result.data
    const (existingVerifiedUser) {
        return Response.json({
            success:false,
            message:'Username already taken',
        }, {status:400})
    }
    return Response.json({
        success:true,
        message:'Username available',
    },{status: 200})

  } catch (error) {
    console.error("Error checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
