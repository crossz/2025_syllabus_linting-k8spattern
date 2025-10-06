export function Slide10() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 5: Lifecycle Management</h2>
      <h3 className="text-2xl mb-4">SIGKILL Signal - 概念</h3>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>SIGTERM 后宽限期超时发送</li>
          <li>强制终止，无清理</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            <span className="italic font-medium">If the container does not terminate within... Kubernetes sends a SIGKILL signal...</span>
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>Non-graceful shutdown</li>
        </ul>
      </div>
    </div>
  );
}