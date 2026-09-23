CREATE TABLE "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by" uuid NOT NULL,
	"url" varchar(256) NOT NULL,
	"title" varchar(111) NOT NULL,
	"favicon_url" varchar(88),
	"thumbnail_url" varchar(111),
	"description" text,
	"comment" text,
	CONSTRAINT "links_url_unique" UNIQUE("url")
);
--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;