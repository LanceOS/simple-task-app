ALTER TABLE "invite_code" DROP CONSTRAINT "invite_code_sent_to_user_id_fk";
--> statement-breakpoint
ALTER TABLE "invite_code" ADD CONSTRAINT "invite_code_sent_to_user_email_fk" FOREIGN KEY ("sent_to") REFERENCES "public"."user"("email") ON DELETE no action ON UPDATE no action;