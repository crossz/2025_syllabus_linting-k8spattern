export function Slide14() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 6: Automated Placement (扩展版)</h2>
      <h3 className="text-2xl mb-4">Pod Affinity and Anti-Affinity - 概念</h3>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>基于Pod标签的亲和性调度</li>
          <li>Affinity: 将Pod调度到相同拓扑域</li>
          <li>Anti-Affinity: 将Pod分散到不同拓扑域</li>
          <li>支持硬约束和软约束</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            Pod affinity and anti-affinity allow co-locating or separating pods based on labels.
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>Pod亲和性控制Pod间的共置关系</li>
        </ul>
      </div>
    </div>
  );
}