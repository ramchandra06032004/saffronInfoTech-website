import { Resend } from "resend";
import Mailjet from "node-mailjet";

const resend = new Resend(process.env.RESEND_API_KEY);
const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC!,
  process.env.MJ_APIKEY_PRIVATE!
);
export { resend, mailjet };
