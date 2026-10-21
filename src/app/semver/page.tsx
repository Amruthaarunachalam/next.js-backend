import { HeadingFlag } from "@/flag";
import { LearningCardFlag } from "@/flag";
import { HorizontalLearningCard } from "../components/horizontalLearningCard";
import { LearningCard } from "../components/learningcard";
import { WorkflowSteps } from "../components/workflowsteps";

export default function SemVer() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          My Learnings in Semantic Versioning
        </h1>
      </div>

      {/* Concept: MAJOR.MINOR.PATCH */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LearningCard
          title="MAJOR — X.0.0"
          description="Increment this when you make an incompatible / breaking change."
          bullets={[
            "Existing code depending on this may stop working",
            "Example: renaming or removing a public function",
          ]}
        />
        <LearningCard
          title="MINOR — 0.X.0"
          description="Increment this when you add functionality in a backwards-compatible way."
          bullets={[
            "Existing consumers keep working without any changes",
            "Example: adding a new optional field or endpoint",
          ]}
        />
        <LearningCard
          title="PATCH — 0.0.X"
          description="Increment this for backwards-compatible bug fixes only."
          bullets={[
            "No new functionality, just a fix",
            "Example: fixing a null-check bug",
          ]}
        />
      </div>

      {/* Workflow: the actual release process I practiced on GitHub */}
      <div>
        <h2 className="text-lg font-bold text-gray-700 dark:text-white uppercase tracking-wide mb-4">
          Semantic Version through GitHub Workflow
        </h2>
        <WorkflowSteps
          steps={[
            {
              title: "1. Merge the feature branch into main",
              description:
                "Open the pull request and merge it into main once it's reviewed and approved.",
             
            },
            {
              title: "2. Delete the merged branch",
              description:
                "Clean up right after merging — GitHub shows a 'Delete branch' button on the same PR page.",
             
            },
            {
              title: "3. Decide the next version number",
              description:
                "Look at what actually changed: a new feature increment MINOR, a bug fix increment PATCH, a breaking change increment MAJOR.",
            },
            {
              title: "4. Create and push a tag",
              description:
                'git tag -a v1.2.0 -m "Added X feature", then git push origin v1.2.0.',
              imgUrl: "/screenshots/Screenshot 2026-09-28 002829.png"
            
            },
            {
              title: "5. Draft a release from the tag",
              description:
                "GitHub → Releases → Draft a new release. Select the tag just pushed, set the target branch to main, and click 'Generate release notes' to auto-fill the changelog from merged PRs.",
             
            },
            {
              title: "6. Choose pre-release / latest",
              description:
                "Check 'Set as a pre-release' only for alpha/beta/RC builds. Check 'Set as the latest release' when this is the newest stable version.",
            },
            {
              title: "7. Publish the release",
              description:
                "Click 'Publish release'. If a release already exists for a tag, then increment the version and draft a new release instead of reusing it.",
              imgUrl: "/screenshots/image.png",
            },
          ]}
        />
      </div>
    </div>
  );
}