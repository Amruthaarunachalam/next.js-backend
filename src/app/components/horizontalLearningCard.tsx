export function HorizontalLearningCard({
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
    <div className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/60 overflow-hidden hover:shadow-lg transition-all duration-200 p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        
        {/* Content Section (Left Side) */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {description}
            </p>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
                Key Takeaways:
              </span>
              <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 space-y-1">
                {bullets.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Image Section (Right Side) */}
        {imgUrl && (
          <div className="w-full lg:w-1/2 relative aspect-video rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden shrink-0">
            <img
              src={imgUrl}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

      </div>
    </div>
  );
}