export function Slide16() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 6: Automated Placement (扩展版)</h2>
      <h3 className="text-2xl mb-4">Taints and Tolerations - 概念</h3>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>Taint: 节点上的排斥标记</li>
          <li>Toleration: Pod上的容忍标记</li>
          <li>实现节点专用化和污染隔离</li>
          <li>支持NoSchedule, PreferNoSchedule, NoExecute</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            Taints and tolerations allow nodes to repel pods, enabling node specialization.
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>污点和容忍实现节点专用化</li>
        </ul>
      </div>
    </div>
  );
}