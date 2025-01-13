import { auth } from "@/auth";
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
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
  const userId = user._id;
  const { acceptMessages } = await req.json();
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
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
      message: "User status updated successfully",
    });
  } catch (err) {
    console.error("failed to update user status to accept messages", err);
    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept messages",
      },
      {
        status: 500,
      }
    );
  }
}


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
  const userId = user._id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
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
      isAcceptingMessages: user.isAcceptingMessages,
    });
  } catch (err) {
    console.error("failed to get user status to accept messages", err);
    return Response.json(
      {
        success: false,
        message: "failed to get user status to accept messages",
      },
      {
        status: 500,
      }
    );
  }
}