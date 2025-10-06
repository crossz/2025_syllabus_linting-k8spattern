export function Slide1() {
  return (
    <div className="slide-container">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">Kubernetes Patterns - Chapter 6: Automated Placement (扩展版)</h1>
      <h2 className="text-2xl mb-8">Reusable Elements for Designing Cloud Native Applications (Second Edition)</h2>
      <p className="text-xl mb-4">作者: Bilgin Ibryam & Roland Huß</p>
      <p className="mb-8">本PPT详细覆盖 Automated Placement 模式，扩展为20页，深入调度过程和控制机制。</p>
      <div className="book-cover-placeholder bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center mb-8">
        <span className="text-gray-500">书籍封面图片</span>
      </div>
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-200 italic">
          This PPT covers the Automated Placement pattern in detail, expanded to 20 pages, diving deep into the scheduling process and control mechanisms.
        </p>
      </div>
    </div>
  );
}