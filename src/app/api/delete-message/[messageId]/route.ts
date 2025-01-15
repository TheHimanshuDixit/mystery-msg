import { auth } from "@/auth";
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export async function DELETE( params: { messageId: string; } ) {
    const messageId = params.messageId;
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
    try {
        const updatedResult = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { messages: { _id: messageId } } }
        );
        if (updatedResult.modifiedCount === 0) {
            return Response.json(
                {
                    success: false,
                    message: "Message not found",
                },
                {
                    status: 404,
                }
            );
        }
        return Response.json({
            success: true,
            message: "Message deleted",
        }, {
            status: 200
        });
    } catch (error) {
        console.error("failed to delete message", error);
        return Response.json(
            {
                success: false,
                message: "failed to delete message",
            },
            {
                status: 500,
            }
        );
    }
}
