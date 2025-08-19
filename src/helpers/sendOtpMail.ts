import VerificationEmail from "../../emailFormat/email";
import { mailjet } from "@/lib/resend";
import { render } from "@react-email/render";

export async function mailJetSendVerificationMail(
  email: string,
  username: string,
  verifyCode: string
) {
  try {
    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "rajumulik51@gmail.com",
            Name: "Saffron RenewTech",
          },
          To: [
            {
              Email: email,
              Name: username,
            },
          ],
          Subject: "Your Verification Code",
          TextPart: `Hello ${username}, your verification code is: ${verifyCode}`,
          HTMLPart: `<h3>Dear ${username}, your verification code is: ${verifyCode}</h3>`,
        },
      ],
    });
    return result.body;
  } catch (err) {
    console.error("Error sending verification email:", err);
    throw new Error("Failed to send verification email.");
  }
}
