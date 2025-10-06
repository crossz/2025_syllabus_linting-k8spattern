export function Slide6() {
  return (
    <div className="slide-container">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">Chapter 7 - Batch Job: Completion Modes</h1>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>NonIndexed: 默认，简单完成计数</li>
          <li>Indexed: 每个 Pod 有唯一索引，用于不同输入</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            The completionMode can be NonIndexed or Indexed...
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>示例: 处理分片数据</li>
        </ul>
      </div>
    </div>
  );
}