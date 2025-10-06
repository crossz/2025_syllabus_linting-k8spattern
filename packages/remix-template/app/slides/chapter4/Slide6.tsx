export function Slide6() {
  return (
    <div className="slide-container">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">Solution - 探针类型介绍</h1>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>Process Health Checks: 基础进程监控</li>
          <li>Liveness: 检查是否 alive，重启失败</li>
          <li>Readiness: 检查是否 ready，移除端点</li>
          <li>Startup: 处理慢启动</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            Kubernetes provides health probes to monitor container health...
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>每个探针特定目的</li>
        </ul>
      </div>
    </div>
  );
}