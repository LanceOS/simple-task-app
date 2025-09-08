CREATE TABLE "journal" (
	"action" text NOT NULL,
	"description" text NOT NULL,
	"metadata" json NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text DEFAULT 'journal' NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "invite_code" ALTER COLUMN "expires_at" SET NOT NULL;