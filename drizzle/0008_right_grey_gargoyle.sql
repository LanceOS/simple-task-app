ALTER TABLE "group_member" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "group_member" ALTER COLUMN "parent_group_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "group_member" ALTER COLUMN "is_admin" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invite_code" ALTER COLUMN "code" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "invite_code" ADD COLUMN "parent_group_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "invite_code" ADD CONSTRAINT "invite_code_parent_group_id_task_group_id_fk" FOREIGN KEY ("parent_group_id") REFERENCES "public"."task_group"("id") ON DELETE no action ON UPDATE no action;