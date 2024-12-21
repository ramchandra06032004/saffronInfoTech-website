import { resend } from "@/lib/resend";
import VerificationEmail from "../../emailFormat/email";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
) {
  try {    
    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verification Email for Saffron RenewTech ',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}