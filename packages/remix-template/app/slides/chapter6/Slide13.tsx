export function Slide13() {
  return (
    <div className="slide-container">
      <h2 className="text-3xl font-bold mb-6">Chapter 6: Automated Placement (扩展版)</h2>
      <h3 className="text-2xl mb-4">Node Affinity - 概念</h3>
      <div className="mb-8">
        <ul className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300">
          <li>比Node Selector更灵活的节点选择</li>
          <li>支持软约束(Preferred)和硬约束(Required)</li>
          <li>基于节点标签的表达式匹配</li>
          <li>支持多种操作符: In, NotIn, Exists, DoesNotExist</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 dark:text-blue-200 italic">
            Node affinity provides more flexible node selection than node selectors.
          </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">关键点:</h2>
        <ul className="list-disc pl-8 text-gray-700 dark:text-gray-300">
          <li>节点亲和性提供更灵活的调度控制</li>
        </ul>
      </div>
    </div>
  );
}