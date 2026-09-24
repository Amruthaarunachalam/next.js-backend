import { defineConfig } from "drizzle-kit";

console.log("DIRECT_URL is:", process.env.DIRECT_URL);

export default defineConfig({
  out: "./src/db/migrations/pg",
  schema: "./src/db/schema/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DIRECT_URL!,
  },
});