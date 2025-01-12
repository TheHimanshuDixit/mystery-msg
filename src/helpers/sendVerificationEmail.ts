import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const em = await resend.emails.send({
      from: "harshhimanshudixit@gmail.com",
      to: email,
      subject: "Mystery Message Verifivation Code",
      react: VerificationEmail({username, otp:verifyCode}),
    });
    if(em.error) {
      console.error("Failed to send verification email", em.error);
      return { success: false, message: "Failed to send verification email" };
    }
    return { success: true, message: "Verification email sent" };
  } catch (error) {
    console.error("Failed to send verification email", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
