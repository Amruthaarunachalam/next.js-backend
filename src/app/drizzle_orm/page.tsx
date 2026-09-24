import { LearningCard } from "../components/learningcard";

export default function DrizzleOrm() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          My Learnings
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LearningCard
          title="Drizzle ORM Schema defining"
          description="Learnt to define tables and specifying column data type in drizzle ORM"
          bullets={[
            "Learnt that based on what type of database, the ORM configuration differs",
            "Defined tables according to PostgreSQL syntax",
          ]}
          imgUrl="/screenshots/Screenshot 2026-09-24 174202.png"
        />
      </div>
    </div>
  );
}