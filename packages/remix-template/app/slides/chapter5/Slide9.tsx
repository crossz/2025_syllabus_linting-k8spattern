export function Slide9() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 5: Lifecycle Management</h2>
      <h3 className="text-2xl mb-4">SIGTERM Signal - 示例</h3>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>示例: 应用捕获 SIGTERM 执行 cleanup</li>
          <li>YAML: terminationGracePeriodSeconds: 30</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            <span className="italic font-medium">Example of how applications can capture SIGTERM to perform cleanup...</span>
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>默认等待30秒</li>
        </ul>
      </div>
    </div>
  );
}