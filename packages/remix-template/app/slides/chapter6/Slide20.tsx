export function Slide20() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 6: Automated Placement (扩展版)</h2>
      <h3 className="text-2xl mb-4">Topology Spread Constraints - 配置示例</h3>
      <div className="mb-8">
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm mb-6">
          {`spec:
  topologySpreadConstraints:
  - maxSkew: 1
    topologyKey: topology.kubernetes.io/zone
    whenUnsatisfiable: DoNotSchedule
    labelSelector:
      matchLabels:
        app: web`}
        </pre>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            Topology spread constraints control how pods are distributed across topology domains.
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>拓扑分布约束配置优化Pod分布</li>
        </ul>
      </div>
    </div>
  );
}