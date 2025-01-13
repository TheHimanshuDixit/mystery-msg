import { auth } from "@/auth";
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function GET() {
    await dbConnect();
    const session = await auth();
    // console.log("session", session);
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

        const msgs = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: "$messages" },
            { $sort: { "messages.createdAt": -1 } },
            {
                $group: {
                    _id: "$_id",
                    messages: { $push: "$messages" }
                }
            }
        ]);
        if (!msgs || msgs.length === 0) {
            console.log("no messages found");
            return Response.json(
                {
                    success: true,
                    message: "No messages found",
                },
                {
                    status: 200,
                }
            );
        }
        console.log("msgs", msgs[0].messages);
        return Response.json({
            success: true,
            messages: msgs[0].messages,
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
