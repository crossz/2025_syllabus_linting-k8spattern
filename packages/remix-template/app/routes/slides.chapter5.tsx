import { ScrollableSlides } from "../slides/chapter5/ScrollableSlides";
import { Link } from "react-router";

export const meta = () => {
  return [
    { title: "Kubernetes Patterns - Chapter 5 Slides" },
    { name: "description", content: "Kubernetes Patterns Chapter 5: Lifecycle Management Slides" },
  ];
};

export default function Chapter5Slides() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950">
      <div className="p-4">
        <Link 
          to="/"
          className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          ← 返回首页
        </Link>
      </div>
      <ScrollableSlides />
    </div>
  );
}