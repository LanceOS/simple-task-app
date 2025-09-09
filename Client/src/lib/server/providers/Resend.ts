import { PRIVATE_RESEND_API } from "$env/static/private";
import { Resend } from "resend";



export const ResendMailer = new Resend(PRIVATE_RESEND_API)

export type ResendClient = typeof ResendMailer