export function Slide20() {
  return (
    <div className="slide-container">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">总结 & Q&A</h1>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>Health Probe: 核心于云原生 observability</li>
          <li>关键 takeaway: 配置探针自动化管理</li>
          <li>与题目整合: 覆盖概念、示例、行为</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>应用到实际部署</li>
        </ul>
      </div>
    </div>
  );
}