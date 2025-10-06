export function Slide15() {
  return (
    <div className="slide-container">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">Chapter 9 - Daemon Service: Solution (DaemonSet Resource)</h1>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>解决方案: DaemonSet 确保每节点一个 Pod</li>
          <li>特性: 自动调度、节点选择、更新策略</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            A DaemonSet ensures that all (or some) Nodes run a copy of a Pod...
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>用例: 日志收集、监控代理</li>
        </ul>
      </div>
    </div>
  );
}