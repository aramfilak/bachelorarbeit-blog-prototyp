CREATE TABLE "Blog" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"content" text NOT NULL,
	"imageUrl" varchar(512) DEFAULT '' NOT NULL,
	"tags" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"readingTime" integer NOT NULL,
	"readingTimeUnit" varchar(50) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
