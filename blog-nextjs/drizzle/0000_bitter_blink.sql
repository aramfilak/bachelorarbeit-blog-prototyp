CREATE TABLE "Blog" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"content" text NOT NULL,
	"imageUrl" varchar(512) DEFAULT 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' NOT NULL,
	"tags" text NOT NULL,
	"readingTime" integer NOT NULL,
	"readingTimeUnit" varchar(50) NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
