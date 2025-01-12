import { auth } from "@/auth";
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function GET() {
    await dbConnect();
    const session = await auth();
    const user = session?.user;
    if (!session || !user) {
        return Response.json(
            {
                success: false,
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }
    const userId = new mongoose.Types.ObjectId(user._id);
    try {

        const user = await UserModel.aggregate([
            { $match: { id: userId } },
            { $unwind: "$messages" },
            { $sort: { "messages.createdAt": -1 } },
            {
                $group: {
                    _id: "$_id",
                    messages: { $push: "$messages" }
                }
            }
        ]);
        if (!user || user.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }
        return Response.json({
            success: true,
            messages: user[0].messages,
        }, {
            status: 200
        });

    } catch (err) {
        console.error("failed to get messages", err);
        return Response.json(
            {
                success: false,
                message: "failed to get messages",
            },
            {
                status: 500,
            }
        );
    }
}
