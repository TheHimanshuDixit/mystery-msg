import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    const { username, email, password } = await request.json();
    await dbConnect();
    try {
        const existingUserVerifiedByUsername = await UserModel
            .findOne({ username, isVerified: true });
        if (existingUserVerifiedByUsername) {
            return Response.json({ success: false, message: "Username already exists" }, { status: 400 });
        }
        const existingUserEmail = await UserModel
            .findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        if (existingUserEmail) {
            if (existingUserEmail.isVerified) {
                return Response.json({ success: false, message: "Email already exists" }, { status: 400 });
            }
            existingUserEmail.password = await bcrypt.hash(password, 10);
            existingUserEmail.verifyCode = verifyCode;
            existingUserEmail.verifyCodeExpiry = new Date();
            existingUserEmail.verifyCodeExpiry.setHours(existingUserEmail.verifyCodeExpiry.getHours() + 1);
            await existingUserEmail.save();
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const user = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],
            });
            await user.save();
        }
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if (!emailResponse.success) {
            return Response.json({ success: false, message: "Failed to send verification email" }, { status: 500 });
        }
        return Response.json({ success: true, message: "User registered successfully. Please verify your email" }, { status: 201 });
    }
    catch (error) {
        console.error("Error Registering User", error);
        return Response.json({ success: false, message: "Failed to register user" }, { status: 500 });
    }
}


