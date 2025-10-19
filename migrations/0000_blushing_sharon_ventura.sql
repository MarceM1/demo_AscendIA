CREATE TYPE "public"."area" AS ENUM('IT', 'MARKETING', 'SALES', 'HR', 'FINANCE');--> statement-breakpoint
CREATE TYPE "public"."interviewer" AS ENUM('BOB', 'LIZA', 'MICHAEL', 'MANUEL', 'LUCIANA');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('USER', 'SUBSCRIPTOR', 'ADMIN', 'RECRUITER', 'INSTITUTION');--> statement-breakpoint
CREATE TABLE "interviews_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"area" "area" DEFAULT 'IT',
	"interviewer" "interviewer" DEFAULT 'LUCIANA',
	"position" varchar(255),
	"feedback" text,
	"score" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"total_interviews" integer DEFAULT 0,
	"avg_score" integer DEFAULT 0,
	"last_improvement" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"bio" text,
	"location" varchar(255),
	"skills" jsonb,
	"preferences" jsonb,
	CONSTRAINT "user_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"session_token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"login_at" timestamp DEFAULT now() NOT NULL,
	"logout_at" timestamp,
	"device_info" jsonb,
	CONSTRAINT "user_sessions_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE "user_skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"skill" varchar(255) NOT NULL
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
	"updated_at" timestamp DEFAULT now(),
	"last_activity_date" timestamp DEFAULT now(),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "interviews_table" ADD CONSTRAINT "interviews_table_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "metrics" ADD CONSTRAINT "metrics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "interviews_user_idx" ON "interviews_table" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "metrics_user_idx" ON "metrics" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_profiles_user_idx" ON "user_profiles" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_sessions_user_idx" ON "user_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_skills_user_idx" ON "user_skills" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "clerk_idx" ON "users" USING btree ("clerk_id");