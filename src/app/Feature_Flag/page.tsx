import { HeadingFlag } from "@/flag";
import { LearningCardFlag } from "@/flag";
import { HorizontalLearningCard } from "../components/horizontalLearningCard";
import { LearningCard } from "../components/learningcard";

const learnings = [
  {
    title: "What is a Feature Flag",
    description:
      "A way to turn a feature on or off through configuration, without writing new code or redeploying.",
    bullets: [
      "Lets you test a new UI safely, or roll a feature out to only some users",
      "Here it's driven by a .env variable, but decide() is async so it could just as easily check a database or which user is logged in",
    ],
  },
  {
    title: "Anatomy of flag()",
    description:
      "Each flag is created once (like HeadingFlag or LearningCardFlag) and reused anywhere on the server.",
    bullets: [
      "key uniquely identifies the flag — kept stable once it's in use",
      "decide() is an async function that returns the flag's current value",
      "Calling HeadingFlag() anywhere re-runs decide() and returns the up-to-date value",
    ],
  },
  {
    title: "Server-only: where it can (and can't) run",
    description:
      "Flags evaluate on the server, so they only work in server-side contexts.",
    bullets: [
      "Works in Server Components, Route Handlers, and Middleware — e.g. await HeadingFlag() at the top of this page",
      "Doesn't work in a 'use client' component or inside useEffect — those run in the browser, which has no access to server env vars or an await in render",
      "If client-rendered UI needs the flag, evaluate it on the server first and pass the boolean down as a prop",
    ],
  },
  {
    title: "How it's wired up on this page",
    description:
      "This page is itself the demo — its heading and card layout both change based on the flags.",
    bullets: [
      "ENABLE_FEATURE and LEARNING_CARD_FEATURE added to .env",
      "await HeadingFlag() and await LearningCardFlag() called at the top of this Server Component",
      "The returned booleans pick between two headings, and between LearningCard's grid layout or HorizontalLearningCard's layout",
    ],
  },
];

export default async function FeatureFlag() {
  const showHeadingFlag = await HeadingFlag();
  const showLearningCardFlag = await LearningCardFlag();

  return (
    <div className="space-y-8">
      <div>
        {showHeadingFlag ? (
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            My Learnings in Feature Flag
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