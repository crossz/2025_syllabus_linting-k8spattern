export function Slide11() {
  return (
    <div className="slide-container">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">Liveness Probes - 配置示例 (2/2)</h1>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>参数: initialDelaySeconds (延迟), periodSeconds (间隔)</li>
          <li>成功: HTTP 200-399</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            This example uses an HTTP GET request to check the /health endpoint every 3 seconds...
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>自定义阈值避免过度重启</li>
        </ul>
      </div>
    </div>
  );
}