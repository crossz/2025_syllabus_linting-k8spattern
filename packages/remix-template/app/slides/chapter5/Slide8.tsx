export function Slide8() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 5: Lifecycle Management</h2>
      <h3 className="text-2xl mb-4">SIGTERM Signal - 概念</h3>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>终止时首先发送，给清理机会</li>
          <li>应用处理: 关闭连接、保存状态</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            <span className="italic font-medium">Kubernetes sends a SIGTERM signal... giving the application a chance...</span>
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>Graceful shutdown</li>
        </ul>
      </div>
      <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm mt-6">
        {`spec:
  containers:
  - name: app
    lifecycle:
      preStop:
        exec:
          command: ["/bin/sh", "-c", "echo Goodbye from PreStop"]`}
      </pre>
    </div>
  );
}