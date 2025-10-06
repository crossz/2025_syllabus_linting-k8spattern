export function Slide12() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 6: Automated Placement (扩展版)</h2>
      <h3 className="text-2xl mb-4">Node Selector - 概念</h3>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>最简单的节点选择机制</li>
          <li>基于节点标签匹配</li>
          <li>硬性要求，不满足则Pod不会调度</li>
          <li>适用于简单场景</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            Node selector is the simplest way to constrain pods to nodes with specific labels.
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>节点选择器是最基本的调度约束</li>
        </ul>
      </div>
    </div>
  );
}