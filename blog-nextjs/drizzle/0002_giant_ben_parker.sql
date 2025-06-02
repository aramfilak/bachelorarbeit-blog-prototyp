ALTER TABLE "Blog" ALTER COLUMN "tags" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "Blog" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::text[];