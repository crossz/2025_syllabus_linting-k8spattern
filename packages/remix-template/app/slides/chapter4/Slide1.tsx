// import type { Route } from "../routes/+types/home";

export function Slide1() {
  return (
    <div className="slide-container">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">Kubernetes Patterns - Chapter 4: Health Probe (扩展版)</h1>
      <h2 className="text-2xl text-gray-800 dark:text-gray-200 mb-8">Reusable Elements for Designing Cloud Native Applications (Second Edition)</h2>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">作者: Bilgin Ibryam & Roland Huß</p>
      <p className="text-gray-600 dark:text-gray-400 mb-8">本PPT详细覆盖 Health Probe 模式，帮助 Kubernetes 监控和管理容器健康。扩展为20页，深入每个子节。</p>
      <div className="book-cover-placeholder bg-gradient-to-r from-blue-400 to-indigo-500 border-2 border-dashed border-white rounded-xl w-full h-64 flex items-center justify-center">
        <span className="text-white text-gray-100">书籍封面图片</span>
      </div>
    </div>
  );
}