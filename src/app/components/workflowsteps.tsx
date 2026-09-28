interface WorkflowStep {
  title: string;
  description: string;
  imgUrl?: string;
}

export function WorkflowSteps({ steps }: { steps: WorkflowStep[] }) {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-4 space-y-10">
      {steps.map((step, idx) => (
        <li key={idx} className="relative ml-6">
          <span className="absolute -left-8.5 flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 dark:bg-gray-500 text-white text-sm font-bold ring-4 ring-white dark:ring-gray-900">
            {idx + 1}
          </span>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/60 p-5">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              {step.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {step.description}
            </p>
            {step.imgUrl && (
              <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <img
                  src={step.imgUrl}
                  alt={step.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}