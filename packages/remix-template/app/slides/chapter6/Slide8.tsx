export function Slide8() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 6: Automated Placement (扩展版)</h2>
      <h3 className="text-2xl mb-4">Available Node Resources - 概念</h3>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>节点容量 (CPU, 内存, 存储)</li>
          <li>节点分配 (已分配资源)</li>
          <li>节点标签 (用于选择)</li>
          <li>污点 (Taints) - 用于排斥</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            Node capacity, allocation, labels, and taints are all important factors in scheduling.
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>节点资源是调度的基础</li>
        </ul>
      </div>
    </div>
  );
}