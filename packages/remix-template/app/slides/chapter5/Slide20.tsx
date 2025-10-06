export function Slide20() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 5: Lifecycle Management</h2>
      <h3 className="text-2xl mb-4">Discussion - 最佳实践 (2/2) & 总结</h3>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>讨论: 提升可靠性和可扩展性</li>
          <li>总结: 关键于云原生设计</li>
          <li>与题目: 覆盖信号、钩子、策略</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            <span className="italic font-medium">Managing the lifecycle of containers is crucial for ensuring applications can handle platform events gracefully...</span>
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>参考 k8spatterns.io</li>
        </ul>
      </div>
    </div>
  );
}