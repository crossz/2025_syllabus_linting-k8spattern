export function HeroSection({ onStart, onViewSlides }: { onStart: () => void, onViewSlides: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 mb-6">
          Kubernetes Patterns
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8">
          基于《Kubernetes Patterns》第二版
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          本书深入探讨了在 Kubernetes 环境中解决常见问题的可重用解决方案，涵盖了基础模式、行为模式、结构模式和配置模式。
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">

        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">基础模式</h3>
          <p className="text-gray-600 dark:text-gray-300">
            包括健康探针、托管生命周期、自动化放置等模式
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">行为模式</h3>
          <p className="text-gray-600 dark:text-gray-300">
            涵盖批处理任务、有状态服务、服务发现等模式
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">结构与配置</h3>
          <p className="text-gray-600 dark:text-gray-300">
            包含控制器、事件路由、配置资源等模式
          </p>
        </div>
      </div>
      
      <div className="mt-16 text-center text-gray-500 dark:text-gray-400">
        <p>基于《Kubernetes Patterns》第二版 - Bilgin Ibryam & Roland Huß</p>
      </div>
    </div>
  );
}