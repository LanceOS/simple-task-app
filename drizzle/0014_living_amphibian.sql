CREATE TABLE "group_metadata" (
	"parent_group_id" uuid NOT NULL,
	"number_of_members" integer DEFAULT 1 NOT NULL,
	"number_of_tasks" integer DEFAULT 0 NOT NULL,
	"number_of_completed" integer DEFAULT 0 NOT NULL,
	"number_in_progress" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "group_member" DROP CONSTRAINT "group_member_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "group_member" DROP CONSTRAINT "group_member_parent_group_id_task_group_id_fk";
--> statement-breakpoint
ALTER TABLE "invite_code" DROP CONSTRAINT "invite_code_parent_group_id_task_group_id_fk";
--> statement-breakpoint
ALTER TABLE "invite_code" DROP CONSTRAINT "invite_code_sent_to_user_email_fk";
--> statement-breakpoint
ALTER TABLE "task_assignee" DROP CONSTRAINT "task_assignee_parent_task_id_task_id_fk";
--> statement-breakpoint
ALTER TABLE "task_group" DROP CONSTRAINT "task_group_owner_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "task" DROP CONSTRAINT "task_parent_group_id_task_group_id_fk";
--> statement-breakpoint
ALTER TABLE "group_metadata" ADD CONSTRAINT "group_metadata_parent_group_id_task_group_id_fk" FOREIGN KEY ("parent_group_id") REFERENCES "public"."task_group"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_parent_group_id_task_group_id_fk" FOREIGN KEY ("parent_group_id") REFERENCES "public"."task_group"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite_code" ADD CONSTRAINT "invite_code_parent_group_id_task_group_id_fk" FOREIGN KEY ("parent_group_id") REFERENCES "public"."task_group"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite_code" ADD CONSTRAINT "invite_code_sent_to_user_email_fk" FOREIGN KEY ("sent_to") REFERENCES "public"."user"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_assignee" ADD CONSTRAINT "task_assignee_parent_task_id_task_id_fk" FOREIGN KEY ("parent_task_id") REFERENCES "public"."task"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_group" ADD CONSTRAINT "task_group_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_parent_group_id_task_group_id_fk" FOREIGN KEY ("parent_group_id") REFERENCES "public"."task_group"("id") ON DELETE cascade ON UPDATE no action;