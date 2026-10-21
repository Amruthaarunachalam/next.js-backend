import { LearningCard } from "../components/learningcard";
import { HorizontalLearningCard } from "../components/horizontalLearningCard";
import { HeadingFlag } from "@/flag";
import { LearningCardFlag } from "@/flag";

const learnings = [
  {
    title: "Schema Definition",
    description:
      "Defined tables using Drizzle's schema builder for PostgreSQL.",
    bullets: [
      "pgTable() defines a table name and its columns",
      "Column types map directly to Postgres types — text, boolean, serial, timestamp",
      ".notNull(), .default(), .primaryKey() chain onto a column to set constraints",
    ],
    imgUrl: "/screenshots/Screenshot 2026-09-24 174202.png",
  },
  {
    title: "CRUD Operations",
    description:
      "Learnt the query-builder syntax for reading and writing data, used in my /api/todo routes.",
    bullets: [
      "Select: db.select().from(todo).where(eq(todo.id, id))",
      "Insert: db.insert(todo).values(data).returning()",
      "Update: db.update(todo).set(data).where(eq(todo.id, id)).returning()",
      "Delete: db.delete(todo).where(eq(todo.id, id))",
    ],
  },
  {
    title: "Generating & Running Migrations",
    description:
      "Learnt how a schema change in code turns into an actual change in the database.",
    bullets: [
      "npx drizzle-kit generate reads schema.ts and writes a new SQL migration file",
      "npx drizzle-kit migrate applies any pending migration files to the database",
      "Migration files build up in the ./drizzle folder, so every schema change is tracked over time",
    ],
  },
  {
    title: "Migrating from Prisma via Introspection",
    description:
      "The tables already existed from Prisma, so instead of hand-writing the schema from scratch, I introspected the live database.",
    bullets: [
      "npx drizzle-kit pull connects to the database and reads its actual table structure",
      "It generates a Drizzle schema file that matches the existing tables automatically",
      "Useful when switching ORMs on a database that already has data — no need to redefine every column by hand",
    ],
  },
  {
    title: "Configuration",
    description:
      "drizzle.config.ts tells drizzle-kit where everything lives and how to connect.",
    bullets: [
      "dialect: 'postgresql' — tells drizzle-kit which SQL dialect to generate",
      "schema — path to the file where table definitions live",
      "out — folder where generated migration files are written",
      "dbCredentials.url — the connection string, read from process.env.DATABASE_URL",
    ],
  },
];

export default async function DrizzleOrm() {
  const showHeadingFlag = await HeadingFlag();
  const showLearningCardFlag = await LearningCardFlag();

  return (
    <div className="space-y-8">
      <div>
        {showHeadingFlag ? (
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            My Learnings in Drizzle ORM
          </h1>
        ) : (
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            My Learnings
          </h1>
        )}
      </div>

      {showLearningCardFlag ? (
        <div className="space-y-6">
          {learnings.map((item) => (
            <HorizontalLearningCard key={item.title} {...item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learnings.map((item) => (
            <LearningCard key={item.title} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}