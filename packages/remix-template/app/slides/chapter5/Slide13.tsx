export function Slide13() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 5: Lifecycle Management</h2>
      <h3 className="text-2xl mb-4">PostStart Hook - 配置示例</h3>
      <ul className="list-disc pl-8 space-y-4">
        <li>YAML 示例:</li>
      </ul>
      <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm mt-4">
        {`spec:  
  containers:  
  - name: app  
    lifecycle:  
      postStart:  
        exec:  
          command: ["/bin/sh", "-c", "echo Hello from PostStart"]`}
      </pre>
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6 mt-6">
        <p className="text-blue-800 dark:text-blue-200 italic">
          <span className="italic font-medium">YAML example showing PostStart hook configuration...</span>
        </p>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
      <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
        <li>在 spec.containers.lifecycle.postStart</li>
      </ul>
    </div>
  );
}