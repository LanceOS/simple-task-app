import { ResendMailer } from "../providers/Resend";

export interface IMailerOptions {
	from: string;
	to: string[];
	subject: string;
	html: string;
	replyTo?: string;
}

export interface IMailer {
	send(options: IMailerOptions): Promise<void>;
}

export class ResendMailerStrategy implements IMailer {
	constructor(private readonly resendClient: any) {
		if (!resendClient) {
			throw new Error('Resend client not provided for ResendMailerStrategy.');
		}
	}

	public async send(options: IMailerOptions): Promise<void> {
		if (!options.to || !options.subject || !options.html) {
			throw new Error('Missing required email fields: to, subject, or html.');
		}
		try {
			const { error } = await this.resendClient.emails.create({
				from: options.from,
				to: options.to,
				subject: options.subject,
				html: options.html,
				replyTo: options.replyTo
			});

			if (error) {
				throw new Error(`Resend API Error: ${error.message}`, { cause: error });
			}

			console.log(`Email sent successfully to: ${options.to.join(', ')}`);
		} catch (error: any) {
			console.error(error);
			throw new Error('Failed to send email via Resend.', { cause: error });
		}
	}
}

export class MailService {
	constructor(private readonly mailer: IMailer) {}

	public async sendMail(options: IMailerOptions): Promise<void> {
		await this.mailer.send(options);
	}
}

export const mailerStrategy = new ResendMailerStrategy(ResendMailer);
export const mailServiceResend = new MailService(mailerStrategy);
