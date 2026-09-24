DROP TABLE "_prisma_migrations" CASCADE;--> statement-breakpoint
ALTER TABLE "Todo" ADD COLUMN "priority" text DEFAULT 'normal';