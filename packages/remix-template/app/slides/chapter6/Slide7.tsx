export function Slide7() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 6: Automated Placement (扩展版)</h2>
      <h3 className="text-2xl mb-4">Solution - 概述 (2/2)</h3>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>子节: Available Node Resources, Container Demands, Scheduler Configs, Process, Affinity 等</li>
          <li>确保 Pod 匹配节点容量</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            The scheduler has a default set of predicate and priority policies configured...
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>调度器默认策略适合多数用例</li>
        </ul>
      </div>
    </div>
  );
}