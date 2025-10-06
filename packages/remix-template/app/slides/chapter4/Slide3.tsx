export function Slide3() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 4: Health Probe</h2>
      <h3 className="text-2xl mb-4">Problem - 容器健康挑战 (1/2)</h3>
      <ul className="list-disc pl-8 space-y-4">
        <li>容器内进程可能遇到多种健康问题</li>
        <li>传统的进程检查不足以确保应用真正健康</li>
        <li>Kubernetes 需要更精细的健康状态信息</li>
      </ul>
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-200 italic">
          <span className="italic font-medium">The process health check is not sufficient to indicate the liveness of the application.</span>
        </p>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
      <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
        <li>问题: 进程存在但应用无响应（无限循环、死锁等）</li>
      </ul>
    </div>
  );
}