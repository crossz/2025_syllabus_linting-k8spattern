export function Slide18() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 6: Automated Placement (扩展版)</h2>
      <h3 className="text-2xl mb-4">Node Affinity - 配置示例</h3>
      <div className="mb-8">
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm mb-6">
          {`spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/hostname
            operator: In
            values:
            - node-1
            - node-2`}
        </pre>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            Node affinity provides more flexible node selection than node selectors.
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>节点亲和性配置支持复杂的匹配规则</li>
        </ul>
      </div>
    </div>
  );
}