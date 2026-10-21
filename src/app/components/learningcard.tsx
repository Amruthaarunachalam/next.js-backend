export function LearningCard({
  title,
  description,
  bullets,
  imgUrl,
}: {
  title: string;
  description: string;
  bullets: string[];
  imgUrl?: string;
}) {
  return (
    <div className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-700 overflow-hidden hover:shadow-xl dark:hover:border-gray-500 dark:hover:shadow-lg dark:hover:shadow-white/10 hover:-translate-y-1 transition-all duration-200 flex flex-col">
      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {description}
          </p>

          <div className="space-y-1.5 mb-4">
            <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider dark:text-gray-200">
              Key Takeaways:
            </span>
            <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-200 space-y-1">
              {bullets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {imgUrl && (
            <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 overflow-hidden rounded-lg">
              <img
                src={imgUrl}
                alt={title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}