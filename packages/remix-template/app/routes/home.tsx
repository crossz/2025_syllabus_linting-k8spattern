import { Link } from "react-router";
import { HeroSection } from "../components/HeroSection";

export const meta = () => {
  return [
    { title: "Kubernetes Patterns - Home" },
    { name: "description", content: "Welcome to Kubernetes Patterns presentation" },
  ];
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950">
      <HeroSection 
        onStart={() => {
          // 滚动到页面中的章节内容部分
          const contentSection = document.querySelector('.text-center');
          if (contentSection) {
            contentSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onViewSlides={() => window.location.href = "/slides"}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            章节内容
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link 
              to="/chapter4" 
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                第四章: Health Probe
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                探索 Kubernetes 中的健康探针模式
              </p>
            </Link>
            
            <Link 
              to="/chapter5" 
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                第五章: Managed Lifecycle
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                探索 Kubernetes 中的托管生命周期模式
              </p>
            </Link>
            
            <Link to="/chapter6" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-purple-500">
              <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-2">第六章: Automated Placement</h3>
              <p className="text-gray-600 dark:text-gray-300">探索 Kubernetes 中的自动化放置模式</p>
            </Link>

            {/* Chapter 7 */}
            <Link to="/chapter7" className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-yellow-500">
              <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">第七章: Batch Job</h3>
              <p className="text-gray-600 dark:text-gray-300">探索 Kubernetes 中的批处理任务模式</p>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
