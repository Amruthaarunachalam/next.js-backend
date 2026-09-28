import { LearningCard } from "../components/learningcard";

export default function WebSockets() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          My Learnings in WebSockets
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LearningCard
          title="WebSockets"
          description="Learnt the basic idea of a persistent, two-way connection between client and server."
          bullets={[
            "Unlike a normal HTTP request/response, a WebSocket connection stays open, so either side can send data at any time",
            "Used for real-time features — chat, live notifications, live dashboards",
            "Implementation depends on the deployment: plain serverless functions can't hold a persistent connection since they're short-lived, so real-time apps usually need an always-on server or a managed real-time service",
          ]}
        />
      </div>
    </div>
  );
}