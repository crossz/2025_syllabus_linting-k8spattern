export function Slide11() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 6: Automated Placement (扩展版)</h2>
      <h3 className="text-2xl mb-4">Process - 概念</h3>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>过滤 (Predicates) - 筛选合适节点</li>
          <li>优先级 (Priorities) - 对节点评分</li>
          <li>绑定 (Binding) - 分配Pod到节点</li>
          <li>抢占 (Preemption) - 必要时驱逐低优先级Pod</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            The scheduling process involves filtering, prioritizing, binding, and preemption.
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>调度是多阶段过程</li>
        </ul>
      </div>
    </div>
  );
}