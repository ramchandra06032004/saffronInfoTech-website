import VerificationEmail from "../../emailFormat/email";
import { mailjet } from "@/lib/resend";
import { render } from "@react-email/render";

export async function mailJetSendVerificationMail(
  email: string,
  username: string,
  verifyCode: string
) {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email</title>
      </head>
      <body style="background: #f6f8fa; font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #f6f8fa; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="400" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 32px 24px;">
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <img src="https://i.imgur.com/8Km9tLL.png" alt="Saffron RenewTech" width="60" style="border-radius: 50%;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 22px; font-weight: 600; color: #222; padding-bottom: 8px;">
                    Email Verification
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 16px; color: #444; padding-bottom: 20px; text-align: center;">
                    Hello <b>${username}</b>,<br />
                    Thank you for registering with <b>Saffron RenewTech</b>.<br />
                    Please use the code below to verify your email address:
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <div style="display: inline-block; background: #f0f4ff; color: #1a73e8; font-size: 28px; font-weight: bold; letter-spacing: 4px; padding: 12px 32px; border-radius: 8px; border: 1px solid #e0e7ff;">
                      ${verifyCode}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 13px; color: #888; text-align: center; padding-top: 12px;">
                    If you did not request this, you can safely ignore this email.<br />
                    <span style="color: #bbb;">&copy; ${new Date().getFullYear()} Saffron RenewTech</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
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
          Subject: "Verify your email address for Saffron RenewTech",
          TextPart: `Hello ${username},\nYour verification code is: ${verifyCode}\nIf you did not request this, you can ignore this email.`,
          HTMLPart: htmlContent,
        },
      ],
    });
    return result.body;
  } catch (err) {
    throw new Error("Failed to send verification email.");
  }
}
