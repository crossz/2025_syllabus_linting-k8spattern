export function Slide11() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 5: Lifecycle Management</h2>
      <h3 className="text-2xl mb-4">SIGKILL Signal - 影响</h3>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>风险: 未完成操作丢失</li>
          <li>建议: 宽限期内完成关键任务</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            <span className="italic font-medium">SIGKILL is a forceful termination that does not give the application a chance...</span>
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>配置 .spec.terminationGracePeriodSeconds</li>
        </ul>
      </div>
    </div>
  );
}