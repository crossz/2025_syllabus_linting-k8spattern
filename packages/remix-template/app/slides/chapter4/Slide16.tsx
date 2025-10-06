export function Slide16() {
  return (
    <div className="slide-container">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">Discussion - 可靠性影响 (1/2)</h1>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>Liveness: 自动恢复失败</li>
          <li>Readiness: 智能流量路由</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            Liveness probes ensure failed containers are restarted, while readiness probes prevent traffic...
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>改善服务可用性</li>
        </ul>
      </div>
    </div>
  );
}