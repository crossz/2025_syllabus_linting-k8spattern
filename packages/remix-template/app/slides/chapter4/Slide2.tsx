export function Slide2() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 4: Health Probe</h2>
      <h3 className="text-2xl mb-4">章节概述</h3>
      <ul className="list-disc pl-8 space-y-4">
        <li>Chapter 4: Health Probe (页41-49)</li>
        <li>关键子节: Problem, Solution, Process Health Checks, Liveness Probes, Readiness Probes, Startup Probes, Discussion</li>
      </ul>
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-200 italic">
          <span className="italic font-medium">The Health Probe pattern indicates how an application can communicate its health state to Kubernetes.</span>
        </p>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
      <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
        <li>焦点: 使应用可观察，提升自动化</li>
      </ul>
    </div>
  );
}