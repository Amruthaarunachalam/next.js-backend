import { LearningCard } from "../components/learningcard";

export default function CiCd() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          My Learnings in CI/CD Pipelines
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LearningCard
          title="CI/CD Pipelines"
          description="Learnt the basic idea of continuous integration and continuous deployment."
          bullets={[
            "CI runs automated build & test steps whenever code is pushed, catching issues before merging",
            "CD then deploys the passing build — to staging, or straight to production depending on the setup",
            "Implementation depends heavily on where the app is deployed: a serverless host like Vercel wires this up automatically on git push, while a self-hosted server usually needs a custom pipeline (e.g. GitHub Actions) to build, test, and redeploy",
          ]}
        />
      </div>
    </div>
  );
}