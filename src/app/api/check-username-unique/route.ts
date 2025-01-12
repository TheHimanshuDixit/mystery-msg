import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";

import { userNameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: userNameValidation
});

export async function GET(req: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);
        const querryParams = {
            username: searchParams.get("username")
        }
        const result = UsernameQuerySchema.safeParse(querryParams);
        console.log(result);
        if (!result.success) {
            const usernameError = result.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: usernameError?.length > 0 ?
                    usernameError.join(", ") : "Invalid username"
            }, { status: 400 });
        }
        const { username } = result.data;
        const existingUser = await UserModel
            .findOne({ username, isVerified: true });

        if (existingUser) {
            return Response.json({ success: false, message: "Username already exists" }, { status: 400 });
        }
        return Response.json({ success: true, message: "Username is unique" }, { status: 200 });

    } catch (error) {
        console.error("Error checking username", error);
        return Response.json({ success: false, message: "Error checking username" }, { status: 500 });
    }
}