import { LearningCard } from "../components/learningcard";

export default function MessageQueue() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          My Learnings in Message Queues
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LearningCard
          title="Message Queues"
          description="Learnt the basic idea of using a queue to decouple two parts of a system."
          bullets={[
            "A producer sends a message to a queue instead of calling the consumer directly, so the two don't need to be online at the same time",
            "A consumer picks up messages from the queue and processes them independently — useful for background work like sending emails or absorbing traffic spikes",
            "Implementation depends on the deployment: serverless setups usually rely on a managed queue (like AWS SQS), since there's no long-running process to host a broker yourself, while a traditional server can self-host something like RabbitMQ",
          ]}
        />
      </div>
    </div>
  );
}