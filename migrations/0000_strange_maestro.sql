CREATE TYPE "public"."role" AS ENUM('USER', 'SUBSCRIPTOR', 'ADMIN', 'RECRUITER', 'INSTITUTION');--> statement-breakpoint
CREATE TABLE "interviews_table" (

);
--> statement-breakpoint
CREATE TABLE "metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"total_interviews" integer DEFAULT 0,
	"avg_score" integer DEFAULT 0,
	"last_improvement" date
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"img_url" text,
	"role" "role" DEFAULT 'USER',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_activity_date" date DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "metrics" ADD CONSTRAINT "metrics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "metrics_user_idx" ON "metrics" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "clerk_idx" ON "users" USING btree ("clerk_id");