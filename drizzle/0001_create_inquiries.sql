CREATE TABLE IF NOT EXISTS "inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(30) NOT NULL,
	"company" varchar(100) NOT NULL,
	"service" varchar(100) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "inquiries_email_idx" ON "inquiries" USING btree ("email");
