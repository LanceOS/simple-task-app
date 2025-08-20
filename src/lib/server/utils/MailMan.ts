import { ResendMailer } from "../providers/Resend";


interface IMailerOptions {
    from?: string;
    to?: string[];
    subject?: string;
    html?: string;
    replyTo?: string;
}

interface IMailer {
    send: (options: IMailerOptions) => Promise<any> 
}




type CommProviders = 'Resend';


export const MailMain = {
	getMailer: (provider: CommProviders): IMailer => {
		try {
			switch (provider) {
				case 'Resend':
					return {
						send: async (options: IMailerOptions) => {
							if (!options.to || !options.subject || !options.html) {
								throw new Error('Missing required email fields');
							}
							const { data, error } = await ResendMailer.emails.create({
								from: options.from || 'Acme <onboarding@resend.dev>',
								to: options.to,
								subject: options.subject,
								html: options.html
							});

							if (error) {
								throw new Error(error.message);
							}

							return data;
						}
					};
			}
		} catch (error: unknown) {
			console.error(error);
			throw new Error(`Error sending out email`, { cause: error });
		}
	},
    sendMail: async (mailer: IMailer, options: IMailerOptions) => {
        try {
            await mailer.send(options)
        }
        catch(error) {
            throw new Error("Error sending mail", { cause: error })
        }
    }
} 