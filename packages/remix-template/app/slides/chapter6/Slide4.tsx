export function Slide4() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 6: Automated Placement (扩展版)</h2>
      <h3 className="text-2xl mb-4">Problem - 放置挑战 (1/2)</h3>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>微服务系统有大量进程，手动放置不可扩展</li>
          <li>Pod 抽象好，但不解决节点分配</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            With a large and ever-growing number of microservices, assigning and placing them individually to nodes is not a manageable activity...
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>示例: 数十或数百微服务</li>
        </ul>
      </div>
    </div>
  );
}